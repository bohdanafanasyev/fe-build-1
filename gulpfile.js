const browserSync = require('browser-sync').create()
const cssnano = require('gulp-cssnano')
const del = require('del')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const nunjucks = require('gulp-nunjucks')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')

/**
 * Config constants needed in gulp tasks
 */
const paths = {
  dist: './dist/',
  src: './src/',
  dir: {
    assets: 'assets/',
    css: 'css/',
    html: 'html/',
    js: 'js/',
    scss: 'scss/'
  },
  filename: {
    css: 'style',
    js: 'index',
    scss: 'style'
  }
}
const isProduction = process.env.NODE_ENV === 'production'
const htmlminConfig = {
  collapseWhitespace: true,
  removeComments: true
}

/**
 * Tasks
 */
gulp.task('clean', () => del(paths.dist))

gulp.task('js', () => gulp.src(`${paths.src}${paths.dir.js}${paths.filename.js}.js`)
  .pipe(babel({ presets: ['@babel/env'] }))
  .pipe(webpack({ mode: process.env.NODE_ENV }))
  .pipe(rename({ basename: paths.filename.js }))
  .pipe(gulp.dest(paths.dist + paths.dir.js))
  .pipe(browserSync.stream()))

gulp.task('css', () => gulp.src(`${paths.src}${paths.dir.scss}${paths.filename.scss}.scss`)
  .pipe(sass().on('error', sass.logError))
  .pipe(rename({ basename: paths.filename.css }))
  .pipe(gulpif(isProduction, cssnano()))
  .pipe(gulp.dest(paths.dist + paths.dir.css))
  .pipe(browserSync.stream()))

gulp.task('html', () => gulp.src(`${paths.src}*.html`)
  .pipe(nunjucks.compile())
  .pipe(gulpif(isProduction, htmlmin(htmlminConfig)))
  .pipe(gulp.dest(paths.dist)))

gulp.task('assets', () => gulp.src([`${paths.src}${paths.dir.assets}**/*.*`])
  .pipe(gulp.dest(paths.dist + paths.dir.assets)))

gulp.task('build', gulp.series('clean', gulp.parallel('js', 'css', 'html', 'assets')))

gulp.task('watch', () => {
  browserSync.init({
    server: paths.dist
  })
  gulp.watch(`${paths.src}${paths.dir.scss}**/*.scss`, gulp.series('css'))
  gulp.watch(`${paths.src}${paths.dir.js}**/*.js`, gulp.series('js'))
  gulp.watch(`${paths.src}**/*.html`, gulp.series('html')).on('change', browserSync.reload)
  gulp.watch(`${paths.src}${paths.dir.assets}**/*.*`, gulp.series('assets')).on('change', browserSync.reload)
})
