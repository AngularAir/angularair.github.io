/* global angular, markdown */
/* eslint no-var:0 */
(function() {
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
      };
    }
  });

  app.controller('MainCtrl', function MainCtrl(markdownGetter, $sce) {
    var vm = this;

    vm.hosts = [
      [
        {
          name: 'Jeff Whelpley',
          twitter: 'jeffwhelpley',
          avatar: 'panel/jeffwhelpley.png'
        }
      ]
    ];

    vm.panelists = [
      [
        {name: 'Olivier Combe', twitter: 'ocombe'},
        {name: 'Aimee Knight', twitter: 'Aimee_Knight'},
        {name: 'Scott Moss', twitter: 'scotups'},
        {name: 'Ari Lerner', twitter: 'auser'}
      ],
      [
        {name: 'Carmen Popoviciu', twitter: 'CarmenPopoviciu'},
        {name: 'Patrick Stapleton', twitter: 'gdi2290'},
        {name: 'Gleb Bahmutov', twitter: 'bahmutov'},
        {name: 'Todd Motto', twitter: 'toddmotto'}
      ]
    ];

    vm.episodes = [
      {
        title: 'Getting Past the Angular Learning Curve',
        displayDate: 'Tuesday, February 2nd, 2016',
        date: '2016-02-02',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/ce8315emtscbq7ef0bo99jg0kao',
        guests: [
          [
            {name: 'Pascal Precht', twitter: 'pascalprecht'}
          ]
        ]
      },
      {
        title: 'The Internet of Things (and Angular)',
        displayDate: 'Tuesday, February 9th, 2016',
        date: '2016-02-09',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/cvb7kq9cus27q0l5505kbedl63s',
        guests: [
          [
            {name: 'Zach Dunn', twitter: 'zachdunn'},
            {name: 'Atticus White', twitter: 'atticoos'}
          ]
        ]
      },
      {
        title: 'Live from ng-nl',
        displayDate: 'Thursday, February 18th, 2016',
        date: '2016-02-18',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/caht91psf3c53e7ngrakc6m78so',
        guests: [
          [
            {name: 'Carmen Popoviciu', twitter: 'CarmenPopoviciu'},
            {name: 'Patrick Stapleton', twitter: 'gdi2290'},
            {name: 'Olivier Combe', twitter: 'ocombe'}
          ]
        ]
      },
      {
        title: 'Angular 2 + Meteor',
        displayDate: 'Tuesday, February 23rd, 2016',
        date: '2016-02-23',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/cfjl7ehr4p9qd0fm90mh7b0aj74',
        guests: [
          [
            {name: 'Uri Goldshtein', twitter: 'UriGoldshtein'}
          ]
        ]
      },
      {
        title: 'Angular 2 + NativeScript',
        displayDate: 'Tuesday, March 1st, 2016',
        date: '2016-03-01',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/cgg9c8c4cikfj75p2irru4bor14',
        guests: [
          [
            {name: 'TJ VanToll', twitter: 'tjvantoll'},
            {name: 'Jen Looper', twitter: 'jenlooper'}
          ]
        ]
      },
      {
        title: 'Angular Universal',
        displayDate: 'Tuesday, March 8th, 2016',
        date: '2016-03-08',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/cnqeh2ttgv3kd3b65rqp2sepnjk',
        guests: [
          [
            {name: 'Jeff Whelpley', twitter: 'jeffwhelpley'},
            {name: 'Patrick Stapleton', twitter: 'gdi2290'}
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
        hangoutUrl: 'https://plus.google.com/u/0/events/c2182d3bec32vs4jim7r8smc1q4',
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
        hangoutUrl: 'https://plus.google.com/events/c6hntmhpemnkna04svmer2jnca8',
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
        hangoutUrl: 'https://plus.google.com/events/cue886f2907d6l1avj1o2159j68',
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
        hangoutUrl: 'https://plus.google.com/events/cto0heinllidfpqqtmlvputrvlg',
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
        hangoutUrl: 'https://plus.google.com/events/c1iuqnqrrbumg08vrmgk6fpmeao',
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
        hangoutUrl: 'https://plus.google.com/events/cmhq7mqarkoful8u7iusbjsdjtk',
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
        hangoutUrl: 'https://plus.google.com/events/c8vsorqvlsoi4r12m60l0fs22c4',
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
        hangoutUrl: 'https://plus.google.com/events/cpn5hnihfuh175tbtbe3i75msgc',
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
        hangoutUrl: 'https://plus.google.com/events/cmoqjb7tmeaai8ugc5i2j81fpm8',
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
        hangoutUrl: 'https://plus.google.com/events/cb42tejb88eliamj65o2ogh12qo',
        guests: [
          [
            {name: 'Andres Dominguez', twitter: 'andresdom'},
            {name: 'Julie Ralph', twitter: 'SomeJulie'},
            {name: 'Zan Thrash', twitter: 'zanthrash'}
          ]
        ]
      },
      {
        title: 'Introducing the Angular Air Panel',
        displayDate: 'Tuesday, April 21st, 2015',
        date: '2015-04-21',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ckq1tk7s4h3dk97n0co8jst305s',
        guests: vm.panelists
      },
      {
        title: 'Angular 2 Alpha',
        displayDate: 'Tuesday, April 28th, 2015',
        date: '2015-04-28',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cpa0ojla7fkk8mfi6h0e0gm2ejo',
        guests: [
          [
            {name: 'Jeff Whelpley', twitter: 'jeffwhelpley'},
            {name: 'Patrick Stapleton', twitter: 'gdi2290'},
            {name: 'Rob Wormald', twitter: 'robwormald'}
          ]
        ]
      },
      {
        title: 'Angular and Firebase',
        displayDate: 'Tuesday, May 5th, 2015',
        date: '2015-05-05',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ctgocfv62l6lj1gj1ijus0hfl20',
        guests: [
          [
            {name: 'David East', twitter: '_davideast', avatar: 'episodes/2015-05-05/davideast.png'},
            {name: 'Jacob Wenger', twitter: '_jwngr', avatar: 'episodes/2015-05-05/jwngr.png'},
            {name: 'Kato Richardson', twitter: 'katowulf'}
          ]
        ]
      },
      {
        title: 'Angular Apps, JavaScript, and Search Optimization',
        displayDate: 'Tuesday, May 12th, 2015',
        date: '2015-05-12',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ci85lav8bdnjl356n5o0fkegb44',
        guests: [
          [
            {name: 'Adam Audette', twitter: 'audette'},
            {name: 'John Mueller', twitter: 'johnmu'},
            {name: 'Jody J. O\'Donnell', twitter: 'gimpslice'},
            {name: 'Max Prin', twitter: 'maxxeight'}
          ]
        ]
      },
      {
        title: 'Architecting huge Angular apps',
        displayDate: 'Tuesday, May 19th, 2015',
        date: '2015-05-19',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c7f6uq69p09v6jdvb0635pf7hok',
        guests: [
          [
            {name: 'Aaron Frost', twitter: 'js_dev'},
            {name: 'Ben Nadel', twitter: 'BenNadel'}
          ]
        ]
      },
      {
        title: 'Angular with Web Components',
        displayDate: 'Tuesday, May 26th, 2015',
        date: '2015-05-26',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/clffu5selsk7klhjrj2bdimd448',
        guests: [
          [
            vm.panelists[0][1], // kara
            {name: 'Rado Kirov', twitter: 'radokirov'},
            {name: 'Rachael L Moore', twitter: 'morewry'}
          ]
        ]
      },
      {
        title: 'Angular Internals',
        displayDate: 'Tuesday, June 2nd, 2015',
        date: '2015-06-02',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c0u8rs3581pjup4la0g2fm6fqc4',
        guests: [
          [
            {name: 'Tero Parviainen', twitter: 'teropa'}
          ]
        ]
      },
      {
        title: 'Angular with TypeScript',
        displayDate: 'Tuesday, June 9th, 2015',
        date: '2015-06-09',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cj80em4hgteokhsa1e6hc50mnq0',
        guests: [
          [
            {name: 'Jonathan Turner', twitter: 'jntrnr'}
          ]
        ]
      },
      {
        title: 'Angular\'s New Router',
        displayDate: 'Tuesday, June 16th, 2015',
        date: '2015-06-16',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cmb8uhkic1du93l1ffgc53vjdcg',
        guests: [
          [
            {name: 'Brian Ford', twitter: 'briantford'}
          ]
        ]
      },
      {
        title: 'Angular 2 Forms',
        displayDate: 'Tuesday, June 23rd, 2015',
        date: '2015-06-23',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/chv2s61pjie9eirimvm2m5och9g',
        guests: [
          [
            {name: 'Victor Savkin', twitter: 'victorsavkin'}
          ]
        ]
      },
      {
        title: 'Angular Accessibility',
        displayDate: 'Tuesday, June 30th, 2015',
        date: '2015-06-30',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ckd0vf27blav9ndi03h49ns4pos',
        guests: [
          [
            {name: 'Marcy Sutton', twitter: 'marcysutton'}
          ]
        ]
      },
      {
        title: 'Angular Data',
        displayDate: 'Tuesday, July 7th, 2015',
        date: '2015-07-07',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ci6mg4094cs1vid645qjegclqi0',
        guests: [
          [
            {name: 'Jeff Cross', twitter: 'jeffbcross', imageExt: 'jpg'},
            {name: 'Alex Rickabaugh', twitter: 'synalx'}
          ]
        ]
      },
      {
        title: 'angular-formly',
        displayDate: 'Tuesday, July 14th, 2015',
        date: '2015-07-14',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c5k02na22bq5k5ftg63bqpvtteo',
        guests: [
          [
            {name: 'Kent C. Dodds', twitter: 'kentcdodds', avatar: 'kentcdodds.png'},
            {name: 'Lukas Ruebbelke', twitter: 'simpulton'}
          ]
        ]
      },
      {
        title: 'Angular and Module Loading',
        displayDate: 'Tuesday, July 21st, 2015',
        date: '2015-07-21',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cmp8evvqkdikpjkis12r45fgqhc',
        guests: [
          [
            {name: 'Guy Bedford', twitter: 'guybedford'}
          ]
        ]
      },
      {
        title: 'TypeScript or ES6 with Babel?',
        displayDate: 'Tuesday, July 28th, 2015',
        date: '2015-07-28',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cvo18elq1u8vam3lhnoa4dheo4k',
        guests: [
          [
            {name: 'Jeff Whelpley', twitter: 'jeffwhelpley'},
            {name: 'Aimee Knight', twitter: 'Aimee_Knight'},
            {name: 'Patrick Stapleton', twitter: 'gdi2290'}
          ]
        ]
      },
      {
        title: 'FalcorJS and Angular 2',
        displayDate: 'Tuesday, August 4th, 2015',
        date: '2015-08-04',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ca3l6qalpu0uqcce58a379006m0',
        guests: [
          [
            {name: 'Jafar Husain', twitter: 'jhusain'}
          ]
        ]
      },
      {
        title: 'Performance, testing and everything in-between',
        displayDate: 'Tuesday, August 11th, 2015',
        date: '2015-08-11',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ce9lds6bk5nnre76da8hhig0n60',
        guests: [
          [
            {name: 'Gleb Bahmutov', twitter: 'bahmutov'}
          ]
        ]
      },
      {
        title: 'Auth0',
        displayDate: 'Tuesday, August 18th, 2015',
        date: '2015-08-18',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c0kajflmtfd8ellt6d7adpbg9mg',
        guests: [
          [
            {name: 'Martin Gonto', twitter: 'mgonto'},
            {name: 'Geoff Goodman', twitter: 'g_goodman'},
            {name: 'Matias Woloski', twitter: 'woloski'}
          ]
        ]
      },
      {
        title: 'Reactive Programming',
        displayDate: 'Tuesday, August 25th, 2015',
        date: '2015-08-25',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cln81vvg8du8kdbr03g7ngh32vs',
        guests: [
          [
            {name: 'Matt Podwysocki', twitter: 'mattpodwysocki'}
          ]
        ]
      },
      {
        title: 'Angular UI-Router',
        displayDate: 'Tuesday, September 1st, 2015',
        date: '2015-09-01',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cuc8f6acabb5g3fnu923t1156lo',
        guests: [
          [
            {name: 'Chris Thielen', twitter: 'ChrisThielen'},
            {name: 'Nate Abele', twitter: 'nateabele'}
          ]
        ]
      },
      {
        title: 'Angular Fundamentals',
        displayDate: 'Tuesday, September 8th, 2015',
        date: '2015-09-08',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cqj1arbi4du7dd5laj58rclc6ck',
        guests: [
          [
            {name: 'Minko Gechev', twitter: 'mgechev'}
          ]
        ]
      },
      {
        title: 'Ag-Grid',
        displayDate: 'Tuesday, Septebmer 15th, 2015',
        date: '2015-09-15',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/coq8qmkmlgtug23f2mju2nfa5sc',
        guests: [
          [
            {name: 'Niall Crosby', twitter: 'angularGrid'}
          ]
        ]
      },
      {
        title: 'Immutable.js with Angular',
        displayDate: 'Tuesday, September 22nd, 2015',
        date: '2015-09-22',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/crh57co6pljeqboef8r9net24po',
        guests: [
            [
              {name: 'Minko Gechev', twitter: 'mgechev'}
            ]
        ]
      },
      {
        title: 'Angular Connect Primer',
        displayDate: 'Tuesday, Septebmer 29th, 2015',
        date: '2015-09-29',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/0/events/cpv6veia6f471gsglg7lg41rd70',
        guests: [
          [
            {name: 'Pete Bacon Darwin', twitter: 'petebd'},
            {name: 'Ruth Yarnit', twitter: 'RuthYarnit'}
          ]
        ]
      },
      {
        title: 'Angular 2 and React',
        displayDate: 'Tuesday, October 6th, 2015',
        date: '2015-10-06',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cgrb5tdo541uo6l9p4sm96jf84k',
        guests: [
          [
            {name: 'Tero Parviainen', twitter: 'teropa'},
            {name: 'Minko Gechev', twitter: 'mgechev'}
          ]
        ]
      },
      {
        title: 'Ionic 2',
        displayDate: 'Tuesday, October 13th, 2015',
        date: '2015-10-13',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c7kt942fkohk44scrrgf35mluco',
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
        title: 'Live at Angular Connect',
        displayDate: 'Tuesday, July 28th, 2015',
        date: '2015-10-20',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c7e4ce3lp23ogqd7g37u77p4bo0',
        guests: [
          [
            {name: 'Jeff Whelpley', twitter: 'jeffwhelpley'},
            {name: 'Olivier Combe', twitter: 'ocombe'},
            {name: 'Aimee Knight', twitter: 'Aimee_Knight'}
          ],
          [

            {name: 'Patrick Stapleton', twitter: 'gdi2290'},
            {name: 'Scott Moss', twitter: 'scotups'},
            {name: 'Carmen Popoviciu', twitter: 'CarmenPopoviciu'}
          ]
        ]
      },
      {
        title: 'Angular Connect Recap',
        displayDate: 'Tuesday, October 27th, 2015',
        date: '2015-10-27',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c5dur9vns3bqujp8akvhn5dkshk',
        guests: [
          [
            {name: 'Jeff Whelpley', twitter: 'jeffwhelpley'},
            {name: 'Olivier Combe', twitter: 'ocombe'},
            {name: 'Aimee Knight', twitter: 'Aimee_Knight'}
          ],
          [

            {name: 'Patrick Stapleton', twitter: 'gdi2290'},
            {name: 'Scott Moss', twitter: 'scotups'},
            {name: 'Carmen Popoviciu', twitter: 'CarmenPopoviciu'}
          ]
        ]
      },
      {
        title: 'ngAnimate 2.0',
        displayDate: 'Tuesday, November 3rd, 2015',
        date: '2015-11-03',
        time: '2:00 PM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/0/events/cof2s4dso4ju3v6gdr9pla2ls4g',
        guests: [
          [
            {name: 'Matias Niemela', twitter: 'yearofmoo'},
            {name: 'Robert Messerle', twitter: 'bobbo_O'}
          ]
        ]
      },
      {
        title: 'Surprise Episode',
        displayDate: 'Tuesday, November 11th, 2015',
        date: '2015-011-11',
        time: '10:15 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cpog9pa6hjqgjdo5hekci926ass'
      },
      {
        title: 'The Importance of Learning JavaScript',
        displayDate: 'Tuesday, November 17th, 2015',
        date: '2015-11-17',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cm77tif4rcm3tb293t70c5kkb1o',
        guests: [
          [
            {name: 'Kyle Simpson', twitter: 'getify'}
          ]
        ]
      },
      {
        title: 'The Angular Community',
        displayDate: 'Tuesday, December 1st, 2015',
        date: '2015-12-01',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c497n1rurigtea0nlq3q7c9qn9c',
        guests: [
          [
            {name: 'Aaron Frost', twitter: 'js_dev'}
          ]
        ]
      },
      {
        title: 'Writing Angular 2 Libraries',
        displayDate: 'Tuesday, December 8th, 2015',
        date: '2015-12-08',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c7m79d5o04nom5eednk5ecqtebk',
        guests: [
          [
            {name: 'Dmitriy Shekhovtsov', twitter: 'valorkin'},
            {name: 'Nathan Walker', twitter: 'wwwalkerrun'}
          ]
        ]
      },
      {
        title: 'The Angular Team',
        displayDate: 'Tuesday, December 15th, 2015',
        date: '2015-12-15',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ccggam0timdvlr50fd4erjct2pc',
        guests: [
          [
            {name: 'Bradly Green', twitter: 'bradlygreen'},
            {name: 'Miško Hevery', twitter: 'mhevery'},
            {name: 'Igor Minar', twitter: 'IgorMinar'}
          ]
        ]
      },
      {
        title: 'Star Wars',
        displayDate: 'Tuesday, December 17th, 2015',
        date: '2015-12-17',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/cthcfidro7bh8428hl8o5kt4128',
        guests: [
          [
            {name: 'Kyle Newman', twitter: 'kyle_newman'},
            {name: 'Randall Koutnik', twitter: 'rkoutnik'}
          ]
        ]
      },
      {
        title: 'The Best Angular Productivity Tips',
        displayDate: 'Tuesday, December 22nd, 2015',
        date: '2015-12-22',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/ciph3us71f9liggnc4n8skq1hg8',
        guests: [
          [
            {name: 'Ari Lerner', twitter: 'auser'}
          ]
        ]
      },
      {
        title: 'What will happen to Angular in 2016?',
        displayDate: 'Tuesday, December 22nd, 2015',
        date: '2015-12-29',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/events/c5dcjhneao15dvc6hkbq0in9fo8?authkey=CMjs_8qK3qa4cQ',
        guests: [
          [
            {name: 'Olivier Combe', twitter: 'ocombe'},
            {name: 'Aimee Knight', twitter: 'Aimee_Knight'},
            {name: 'Patrick Stapleton', twitter: 'gdi2290'},
            {name: 'Jeff Whelpley', twitter: 'jeffwhelpley'}
          ]
        ]
      },
      {
        title: 'How to become an open source contributor',
        displayDate: 'Tuesday, January 5th, 2016',
        date: '2016-01-05',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/cn6og48n6l1s070im5b5qjac7ts',
        guests: [
          [
            {name: 'Wesley Cho', twitter: 'BahamutWC'},
            {name: 'Jesus Rodriguez', twitter: 'Foxandxss'}
          ]
        ]
      },
      {
        title: 'Why empathy will make you a better developer',
        displayDate: 'Tuesday, January 12th, 2016',
        date: '2016-01-12',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/clffugstoslk8vjlh2qd5mjamrg',
        guests: [
          [
            {name: 'Joe Eames', twitter: 'josepheames'}
          ]
        ]
      },
      {
        title: 'What\'s new in RxJS 5.0?',
        displayDate: 'Tuesday, January 19th, 2016',
        date: '2016-01-19',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/c2ic6t5id964kdo47dr0of5d3ag',
        guests: [
          [
            {name: 'Ben Lesh', twitter: 'benlesh'}
          ]
        ]
      },
      {
        title: 'TypeScript Deep Dive',
        displayDate: 'Tuesday, January 26th, 2016',
        date: '2016-01-26',
        time: '11:00 AM (Pacific Time)',
        hangoutUrl: 'https://plus.google.com/u/1/b/104335210120652090229/events/cd8aehgp75b2bm9esirp5adrmp0',
        guests: [
          [
            {name: 'Alex Eagle', twitter: 'jakeherringbone'},
            {name: 'Blake Embrey', twitter: 'blakeembrey'}
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
            guest.avatar = 'episodes/' + episode.date + '/' + guest.twitter + '.' + (guest.imageExt || 'png');
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

  app.directive('linkIcon', function linkIcon() {
    return {
      restrict: 'E',
      template: function(el, attrs) {
        return [
          '<div class="link-icon">',
          '<a href="' + attrs.link + '" title="' + attrs.title + '">',
          '<i class="fa fa-' + attrs.icon + '"></i>',
          '</a>',
          '</div>'
        ].join('');
      }
    };
  });

  app.directive('subscribeIcon', function subscribeIcon() {
    return {
      restrict: 'E',
      template: function(el, attrs) {
        return '<link-icon icon="' + attrs.icon + '" link="' + attrs.link + '" title="Subscribe on ' + attrs.network + '"></link-icon>';
      }
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
