'use strict';

const gulp    = require('gulp');
const sass    = require('./build/sass');
const scripts = require('./build/scripts');
const images  = require('./build/images');
const fonts   = require('./build/fonts');
const sync    = require('./build/browsersync');

[ sass, scripts, images, fonts, sync ].forEach( task => {
  task( gulp );
});

gulp.task('build', ['sass', 'scripts', 'images', 'fonts', 'jekyll-build']);
