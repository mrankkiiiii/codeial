const gulp = require('gulp');
//css minifying
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
//for renaming files
const rev = require('gulp-rev');
//for js minifying
const uglify = require('gulp-uglify-es').default;


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
     //manifest use to store the map of original file to renaming files
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

gulp.task('js', function(done){
    console.log('minifying js');
    //double start any folder and single start for any file
    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
   
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});