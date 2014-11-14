
(function () {

  'use strict';
  var app = angular.module('ngAir', []);
  app.constant('markdown', markdown);
  app.constant('MODERATOR', MODERATOR);

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
    vm.generalModeratorUrl = 'https://www.google.com/moderator/#15/e=213bb7&t=213bb7.40';
    vm.episodes = [
      {
        title: 'The Angular Team on 1.3 & 2.0',
        displayDate: 'Friday, November 14th, 2014',
        date: '2014-11-14',
        time: '2:00 PM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/0/b/104335210120652090229/events/c2182d3bec32vs4jim7r8smc1q4',
        moderatorUrl: 'https://www.google.com/moderator/#15/e=213bb7&t=213bb7.41',
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
        title: 'Hitting the Ground Running with Angular',
        displayDate: 'Tuesday, December 2nd, 2014',
        date: '2014-12-02',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/0/events/cg90utbgkqg89fg43k62kav02v4',
        moderatorUrl: 'https://www.google.com/moderator/#15/e=213bb7&t=213bb7.42',
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

  app.directive('moderatorEmbed', function moderatorEmbedDirective(MODERATOR) {
    'use strict';
    return {
      restrict: 'E',
      scope: {
        moderatorUrl: '@'
      },
      link: function(scope, el, attrs) {
        var width = el.parent()[0].offsetWidth;
        if (width < 800) {
          el.html(
            '<div>' +
            'Your screen is pretty narrow. ' +
            'You may want to open up <a href="' + scope.moderatorUrl + '">the Q&A</a> in another tab...' +
            '</div>'
          )
        } else {
          var mod = new MODERATOR(scope.moderatorUrl);
          mod.width = width;
          mod.embed(el[0]);
        }
      }
    };
  });
})();
