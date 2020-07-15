const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');

gulp.task('css', function(done){
    console.log('minifying css');
    //double start any folder and single start for any file
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));
    
    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('css', function(done){
    console.log('minifying css');
    //double start any folder and single start for any file
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));
    
    gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});