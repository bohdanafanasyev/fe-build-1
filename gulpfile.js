const del = require('del')
const gulp = require('gulp')
const babel = require('gulp-babel')
const nunjucks = require('gulp-nunjucks')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const webpack = require('webpack-stream')

sass.compiler = require('node-sass')

/**
 * Config paths
 */
const paths = {
  base: {
    dist: './dist/',
    src: './src/',
  },
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

gulp.task('clean', () => {
  return del(paths.base.dist)
})

gulp.task('js', () => {
  return gulp.src(paths.base.src + paths.dir.js + paths.filename.js + '.js')
    .pipe(babel({ presets: ['@babel/env']}))
    .pipe(webpack({ mode: process.env.NODE_ENV }))
    .pipe(rename({ basename: paths.filename.js })) // redundant in this case
    .pipe(gulp.dest(paths.base.dist + paths.dir.js))
})

gulp.task('css', () => {
  return gulp.src(paths.base.src + paths.dir.scss + paths.filename.scss + '.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename({ basename: paths.filename.css }))
    .pipe(gulp.dest(paths.base.dist + paths.dir.css))
})

gulp.task('html', () => {
	return gulp.src(paths.base.src + '*.html')
		.pipe(nunjucks.compile())
		.pipe(gulp.dest(paths.base.dist))
})

gulp.task('build', gulp.series('clean', gulp.parallel('js', 'css', 'html')))

// gulp.task('css:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });