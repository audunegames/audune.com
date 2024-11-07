const brfs = require('brfs');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webserver = require('gulp-webserver');


function handleError(err) {
  console.error(err.message);
  this.emit('end');
}


async function styles() {
  return gulp.src('./src/scss/main.scss')
    .pipe(rename('bundle.css'))
    .pipe(sourcemaps.init())
    .pipe(sass.sync({includePaths: ['./node_modules']})
       .on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/css'));
}

async function scripts() {
  const b = browserify('./src/js/main.js', {debug: true});
  b.transform('brfs');

  return b.bundle()
    .on('error', handleError)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./dist/js'))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js'));
}

async function dev() {
  gulp.watch('src/scss/**.scss', styles);
  gulp.watch('src/js/**.js', scripts);

  return gulp.src('.')
    .pipe(webserver({fallback: 'index.html', livereload: true}))
    .on('error', handleError);
}


exports.build = gulp.series(styles, scripts);
exports.dev = dev;
