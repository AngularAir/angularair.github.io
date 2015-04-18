
(function () {
  'use strict';

  var app = angular.module('ngAir', []);
  app.constant('markdown', markdown);

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

    vm.host = {
      name: 'Kent C. Dodds',
      twitter: 'kentcdodds',
      avatar: 'kentcdodds.png'
    };

    vm.panelists = [
      [
        {name: 'Carmen Popoviciu', twitter: 'CarmenPopoviciu'},
        {name: 'Kara Erickson', twitter: 'karaforthewin'},
        {name: 'Olivier Combe', twitter: 'ocombe'},
        {name: 'Todd Motto', twitter: 'toddmotto'}
      ]
    ];

    vm.episodes = [
      {
        title: 'Introducing the Angular Air Panel',
        displayDate: 'Tuesday, April 21st, 2015',
        date: '2015-04-21',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/ckq1tk7s4h3dk97n0co8jst305s',
        guests: vm.panelists
      },
      {
        title: 'Angular 2 Alpha',
        displayDate: 'Tuesday, April 28th, 2015',
        date: '2015-04-28',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cpa0ojla7fkk8mfi6h0e0gm2ejo',
        guests: [
          [
            {name: 'Jeff Whelpley', twitter: 'jeffwhelpley'},
            {name: 'Patrick Stapleton', twitter: 'gdi2290'},
            {name: 'Rob Wormald', twitter: 'robwormald'}
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
      },
      {
        title: 'Staying up with AngularJS',
        displayDate: 'Tuesday, January 13th, 2015',
        date: '2015-01-13',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cue886f2907d6l1avj1o2159j68',
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
        guests: [
          [
            {name: 'Joe Eames', twitter: 'josepheames'},
            {name: 'Aaron Frost', twitter: 'js_dev'}
          ],
          [
            {name: 'Kip Lawrence', twitter: 'mightykip'},
            {name: 'Dave Geddes', twitter: 'geddski'},
            {name: 'Merrick Christensen', twitter: 'iammerrick'}
          ]
        ]
      },
      {
        title: 'On-site ng-nl broadcast',
        displayDate: 'Friday, February 13th, 2015',
        date: '2015-02-13',
        time: '3:30 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/c1iuqnqrrbumg08vrmgk6fpmeao',
        guests: [
          [
            {name: 'NG-NL', twitter: 'ngnlconf', noCircle: true}
          ]
        ]
      },
      {
        title: 'Ionic Framework',
        displayDate: 'Tuesday, March 17th, 2015',
        date: '2015-03-17',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cmhq7mqarkoful8u7iusbjsdjtk',
        guests: [
          [
            {name: 'Adam Bradley', twitter: 'adamdbradley'},
            {name: 'Mike Hartington', twitter: 'mhartington'}
          ],
          [
            {name: 'Max Lynch', twitter: 'maxlynch'},
            {name: 'Ben Sperry', twitter: 'benjsperry'}
          ]
        ]
      },
      {
        title: 'Developing Open Source Angular Libraries',
        displayDate: 'Tuesday, March 24th, 2015',
        date: '2015-03-24',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/c8vsorqvlsoi4r12m60l0fs22c4',
        guests: [
          [
            {name: 'Jason Dobry', twitter: 'jmdobry'},
            {name: 'Olivier Combe', twitter: 'OCombe'}
          ]
        ]
      },
      {
        title: 'i18n with Angular',
        displayDate: 'Tuesday, March 31st, 2015',
        date: '2015-03-31',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cpn5hnihfuh175tbtbe3i75msgc',
        guests: [
          [
            {name: 'Pascal Precht', twitter: 'PascalPrecht'},
            {name: 'Chirayu Krishnappa', twitter: 'chirayuk'}
          ]
        ]
      },
      {
        title: 'Contributing to Angular',
        displayDate: 'Tuesday, April 7th, 2015',
        date: '2015-04-07',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cmoqjb7tmeaai8ugc5i2j81fpm8',
        guests: [
          [
            {name: 'Pawel Kozolowski', twitter: 'pkozlowski_os'},
            {name: 'Rodric Haddad', twitter: 'rodyhaddad'}
          ]
        ]
      },
      {
        title: 'Testing with Angular',
        displayDate: 'Tuesday, April 14th, 2015',
        date: '2015-04-14',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/b/104335210120652090229/events/cb42tejb88eliamj65o2ogh12qo',
        guests: [
          [
            {name: 'Andres Dominguez', twitter: 'andresdom'},
            {name: 'Julie Ralph', twitter: 'SomeJulie'},
            {name: 'Zan Thrash', twitter: 'zanthrash'}
          ]
        ]
      }
    ];

    angular.forEach(vm.panelists, function(panelistGroup) {
      angular.forEach(panelistGroup, function(panelist) {
        if (!panelist.avatar) {
          panelist.avatar = 'panel/' + panelist.twitter + '.png';
        }
      });
    });

    angular.forEach(vm.episodes, function(episode) {
      angular.forEach(episode.guests, function(group) {
        angular.forEach(group, function(guest) {
          if (!guest.avatar) {
            guest.avatar = 'episodes/' + episode.date + '/' + guest.twitter + '.png';
          }
        });
      });

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

  app.directive('personGroup', function personGroup() {
    return {
      templateUrl: 'person-group-template.html',
      restrict: 'E',
      scope: {
        groups: '='
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: angular.noop
    };
  });

  app.directive('person', function person() {
    return {
      templateUrl: 'person-template.html',
      restrict: 'A',
      scope: {
        person: '='
      },
      bindToController: true,
      controllerAs: 'vm',
      controller: angular.noop
    };
  });

  window.featureShow = function featureShow(index) {
    var originalEpisode = document.querySelectorAll('.episode')[index];
    var $scope = angular.element(originalEpisode).scope();
    var newGuests = [];
    $scope.episode.guests.forEach(function(guests) {
      newGuests = newGuests.concat(guests);
    });
    $scope.episode.guests = [newGuests];
    $scope.$apply();
    var episode = originalEpisode.querySelector('.main-episode-content').cloneNode(true);
    var hangoutsUrl = episode.querySelector('.hangouts-url');
    var episodeTitle = episode.querySelector('.episode__title');
    var firstRowOfGuests = episode.querySelector('.group');

    episode.removeChild(hangoutsUrl);

    episode.style.marginTop = '500px';
    episode.style.marginBottom = '500px';

    episodeTitle.style.textAlign = 'center';
    episodeTitle.style.marginBottom = '0';
    episodeTitle.style.fontSize = '36px';

    firstRowOfGuests.style.marginTop = '20px';

    document.body.innerHTML = '';
    document.body.appendChild(episode);
  };
})();
