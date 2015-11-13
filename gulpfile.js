var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    imagemin = require('gulp-imagemin'),
    rigger = require('gulp-rigger'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    serve = require('serve-static'),
    connect = require('connect'),
    browsersync = require('browser-sync');


    // - HTML
    gulp.task('html', function () {
       return gulp.src('./src/index.html')
            .pipe(rigger()) 
            .pipe(gulp.dest('./')) 
            .pipe(notify('HTML : Done!'));
        });


    // - Styles
    gulp.task('styles', function() {
        return gulp.src([
            'src/scss/states/_*.scss', 
            'src/scss/utilities/_*.scss', 
            'src/scss/base/_*.scss', 
            'src/scss/layout/_*.scss', 
            'src/scss/modules/_*.scss'
            ])
        .pipe(concat('styles.scss'))
        .pipe(autoprefixer({ "browsers": ["firefox >= 15", "ios >= 8", "android >= 4.0", "and_uc >= 9.9", "ie >= 9"] }))
        .pipe(sass({outputStyle : 'compact'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(minifyCss())
        .pipe(gulp.dest('./'))
        .pipe(notify('Styles : Done!'));
    });


    // - Scripts
    gulp.task('scripts', function() {
        return gulp.src('src/js/_*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./js/'))
        .pipe(notify('Scripts : Done!'));
    });


    // - Images
    gulp.task('images', function() {
        return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./img'))
        .pipe(notify('Imagemin : Done!'));
    });


    // - Server
    gulp.task('server', function() {
        return connect().use(serve(__dirname))
        .listen(8080)
        .on('listening', function() {
            console.log('Server is running!');
        });
    });


    // - Browser Sync
    gulp.task('browsersync', function(cb) {
        return browsersync({
            server: {
                baseDir:'./'
            }
        }, cb);
    });


    // - Watch
    gulp.task('watch', function() {

        gulp.watch(['src/template-parts/*.html', 'src/index.html'], ['html', browsersync.reload]);

        gulp.watch('src/scss/*/_*.scss', ['styles', browsersync.reload]);

        gulp.watch('src/js/_*.js', ['scripts', browsersync.reload]);

        gulp.watch('src/img/*', ['images', browsersync.reload]);

    });


    // - Default task
    gulp.task('default', ['html', 'styles', 'scripts', 'images', 'server', 'browsersync', 'watch']);

