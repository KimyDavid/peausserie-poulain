// plugins
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyCss = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

const distFolder = './assets/';
const srcFolder = './scss/*.scss';


function css() {
  return (
    gulp
      .src(srcFolder, { since: gulp.lastRun(css) })
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(plumber())
      .pipe(autoprefixer())
      .pipe(minifyCss())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(distFolder))
  );
}

function watch() {
  gulp.watch([srcFolder], css);
}

const dev = gulp.parallel(watch);

// exports
exports.dev = dev;