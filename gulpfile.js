var gulp = require('gulp'); 
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

/*=======development tasks=========*/
//-----------------
// Converts Sass to CSS with gulp-sass
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass()) //plugin to perform task
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
  }))
});


/*=======Watch tasks=========*/
gulp.task('watch',['browserSync','sass'], function(){
   gulp.watch('app/scss/**/*.scss',['sass']);
   gulp.watch('app/*.html',browserSync.reload);
   gulp.watch('app/js/**/*.js',browserSync.reload);
   //other watches
});


/*=======Spinning Web Server=========*/
gulp.task('browserSync',function(){
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});


/*=======Optimisation tasks=========*/

//concatenation and minification
gulp.task('useref',function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    //minifies only if it is js 
    .pipe(gulpIf('*.js',uglify()))
    .pipe(gulpIf('*.css',cssnano()))
    .pipe(gulp.dest('dist'))
});

//image minification
gulp.task('images',function(){
    return gulp.src('app/images/**/*.+(jpg|jpeg|png|gif|svg)')
    .pipe(cache(imagemin({
        interlaced: true
    })))
    .pipe(gulp.dest('dist/images'))
});

//font transfer to dist
gulp.task('fonts',function(){
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});



/*=======Cleaning tasks=========*/

//Cleaning cache
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

//del dist files
gulp.task('clean:dist',function(){
    return del.sync('dist');
});

/*=======Build tasks=========*/

//build task to combine other tasks
gulp.task('build',function(callback){
    runSequence('clean:dist',['sass','useref','images','fonts'],callback)
});


//default task to run
gulp.task('default',function(callback){
    runSequence(['sass','browserSync','watch'],callback)
});

