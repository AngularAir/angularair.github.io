var gulp = require('gulp');
import {provide, REQUEST_URL, NODE_LOCATION_PROVIDERS} from 'angular2-universal-preview';
import {APP_BASE_HREF, ROUTER_PROVIDERS} from 'angular2/router';

var ngPreRender = require('angular2-gulp-prerender');

import {App} from './src/app';

gulp.task('prerender', () => {

  return gulp.src('./src/index.html')
    .pipe(ngPreRender({
      App,
      providers: [
        provide(APP_BASE_HREF, {useValue: '/'}),
        provide(REQUEST_URL, {useValue: '/'}),
        ROUTER_PROVIDERS,
        NODE_LOCATION_PROVIDERS,
      ],
      preboot: false
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('watch:prerender', () => {
  gulp.watch(['./src/index.html', './src/app/**'], ['prerender']);
});

gulp.task('default', ['prerender'], () => {
  console.log('welcome');
});
