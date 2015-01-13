
(function () {
  'use strict';

  var app = angular.module('ngAir', []);
  app.constant('markdown', markdown);
  app.constant('MODERATOR', MODERATOR);

  app.factory('markdownGetter', function markdownGetter($http, markdown) {
    return {
      getDescription: getMarkdownFileGetter('description.md'),
      getSponsorship: getMarkdownFileGetter('sponsorship.md')
    };

    function getMarkdownFileGetter(fileName) {
      return function getMarkdownFile(episodeDate) {
        return $http.get('episodes/' + episodeDate + '/' + fileName).then(function(response) {
          return markdown.toHTML(response.data, 'Maruku');
        });
      }
    }
  });

  app.controller('MainCtrl', function MainCtrl(markdownGetter, $sce) {
    var vm = this;
    vm.generalModeratorUrl = 'https://www.google.com/moderator/#15/e=213bb7&t=213bb7.40';
    vm.episodes = [
      {
        title: 'Staying up with AngularJS',
        displayDate: 'Tuesday, January 13th, 2015',
        date: '2015-01-13',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cue886f2907d6l1avj1o2159j68',
        moderatorUrl: 'https://www.google.com/moderator/#15/e=213bb7&t=213bb7.45',
        guests: [
          [
            {name: 'Air Lerner', twitter: 'auser'}
          ]
        ],
        sponsors: [
          [
            {name: 'ReactWeek', website: 'http://reactweek.com/', noCircle: true}
          ]
        ]
      },
      {
        title: 'Angular Community and Organizing ng-conf',
        displayDate: 'Tuesday, January 27th, 2015',
        date: '2015-01-27',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cto0heinllidfpqqtmlvputrvlg',
        moderatorUrl: 'https://www.google.com/moderator/#15/e=213bb7&t=213bb7.46',
        guests: [
          [
            {name: 'Joe Eames', twitter: 'josepheames'},
            {name: 'Aaron Frost', twitter: 'js_dev'},
            {name: 'Kip Lawrence', twitter: 'mightykip'}
          ]
        ]
      },
      {
        title: 'On-site ng-nl broadcast',
        displayDate: 'Friday, February 13th, 2015',
        date: '2015-02-13',
        time: '',
        hangoutUrl: '',
        moderatorUrl: '',
        guests: [
          [
            {name: 'NG-NL', twitter: 'ngnlconf', noCircle: true}
          ]
        ]
      }
    ];

    vm.pastEpisodes = [
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
      },
      {
        title: 'Angular DevTools',
        displayDate: 'Tuesday, December 16th, 2014',
        date: '2014-12-16',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/c6hntmhpemnkna04svmer2jnca8',
        moderatorUrl: 'https://www.google.com/moderator/#15/e=213bb7&t=213bb7.44',
        guests: [
          [
            {name: 'Brian Ford', twitter: 'briantford'}
          ]
        ],
        sponsors: [
          [
            {name: 'ShirtJS', website: 'http://shirtjs.com/'}
          ]
        ]
      }
    ];

    angular.forEach(vm.episodes, function (episode) {
      markdownGetter.getDescription(episode.date).then(function success(markdown) {
        episode.description = $sce.trustAsHtml(markdown);
      });
      markdownGetter.getSponsorship(episode.date).then(function success(markdown) {
        episode.sponsorship = $sce.trustAsHtml(markdown);
      });
    });
  });

  app.factory('CurrentUser', function CurrentUser($window) {
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
