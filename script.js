
(function () {
  'use strict';
  var app = angular.module('ngAir', ['firebase']);
  app.constant('markdown', markdown); // global
  app.constant('Firebase', Firebase); // global
  app.constant('_', _); // global

  app.factory('descriptionGetter', function descriptionGetter($http, markdown) {
    'use strict';
    return {
      getDescription: getDescription
    };

    function getDescription(episodeDate) {
      return $http.get('episodes/' + episodeDate + '/description.md').then(function (response) {
        return markdown.toHTML(response.data, 'Maruku');
      });
    }
  });

  app.controller('MainCtrl', function MainCtrl(descriptionGetter, $sce) {
    'use strict';
    var vm = this;
    vm.episodes = [
      {
        title: 'The Angular Team on 1.3 & 2.0',
        displayDate: 'Friday, November 14th, 2014',
        date: '2014-11-14',
        time: '3:00 PM (MST)',
        hangoutUrl: 'https://plus.google.com/u/0/b/104335210120652090229/events/c2182d3bec32vs4jim7r8smc1q4',
        guests: [
          [
            {name: 'Bradly Green', twitter: 'bradlygreen'},
            {name: 'Miško Hevery', twitter: 'mhevery'}
          ],
          [
            {name: 'Igor Minar', twitter: 'IgorMinar'},
            {name: 'Pete Bacon Darwin', twitter: 'petebd'}
          ]
        ]
      },
      {
        title: 'Hurdles getting into Angular',
        displayDate: 'Tuesday, December 2nd, 2014',
        date: '2014-12-02',
        time: '12:00 PM (MST)',
        hangoutUrl: 'https://plus.google.com/u/0/events/cg90utbgkqg89fg43k62kav02v4',
        guests: [
          [
            {name: 'John Lindquist', twitter: 'johnlindquist'}
          ]
        ]
      }
    ];

    angular.forEach(vm.episodes, function (episode) {
      descriptionGetter.getDescription(episode.date).then(function (description) {
        episode.description = $sce.trustAsHtml(description);
      });
    });
  });

  app.factory('CurrentUser', function CurrentUser($window) {
    'use strict';
    var key = 'user-obj';
    var store = $window.localStorage;
    var currentUser = null;
    return {
      getUser: getUser,
      setUser: setUser
    };

    function getUser() {
      if (!currentUser) {
        currentUser = JSON.parse(store.getItem(key));
      }
      return currentUser;
    }

    function setUser(user) {
      if (!user) {
        store.removeItem(key);
      } else {
        store.setItem(key, JSON.stringify(user));
      }
    }
  });

  app.controller('ChatCtrl', function ChatCtrl(Firebase, $firebase, $firebaseSimpleLogin, CurrentUser) {
    'use strict';
    var vm = this;
    var authRef = new Firebase('https://bucketstreams.firebaseio.com');
    var authClient = $firebaseSimpleLogin(authRef);
    var questions = new Firebase('https://bucketstreams.firebaseio.com/ng-air/qa/questions');
    var sync = $firebase(questions);

    vm.user = CurrentUser.getUser();
    vm.questions = sync.$asArray();

    vm.login = login;
    vm.logout = logout;
    vm.deleteQuestion = deleteQuestion;
    vm.submitQuestion = submitQuestion;
    vm.toggleVote = toggleVote;


    function login() {
      authClient.$login('twitter').then(function (user) {
        vm.user = user;
        CurrentUser.setUser(user);
        console.log('user', user);
      }, function (error) {
        console.error('error', error);
        console.error(error.stack);
      });
    }

    function logout() {
      authClient.$logout();
      vm.user = null;
      CurrentUser.setUser();
    }

    function deleteQuestion(question) {
      if (!checkUser() && question.user.id === vm.user.id) {
        return;
      }
      vm.questions.$remove(question);
    }

    function submitQuestion() {
      if (!checkUser()) {
        return;
      }
      vm.question.votes = [];
      vm.question.user = {
        id: vm.user.id,
        displayName: vm.user.displayName
      };
      vm.questions.$add(vm.question).then(function () {
        vm.question = null;
      });
    }

    function toggleVote(question) {
      if (!checkUser()) {
        return;
      }
      question.votes = question.votes || [];
      var index = question.votes.indexOf(vm.user.id);
      if (index > -1) {
        question.votes.splice(index, 1);
      } else {
        question.votes.push(vm.user.id);
      }
      vm.questions.$save(question);
    }

    function checkUser() {
      if (!vm.user) {
        alert('You have to be logged in to do that!');
      }
      return !!vm.user;
    }

  });

  app.filter('sortByVotes', function (_) {
    'use strict';
    return function sortByVotes(questions) {
      return _.sortBy(questions, function (question) {
        return (question.votes || []).length;
      }).reverse();
    }
  });
})();
