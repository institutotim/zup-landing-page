'use strict';
// generated on 2014-11-04 using generator-gulp-webapp 0.1.0

var gulp = require('gulp');
var merge = require('merge-stream');

// load plugins
var $ = require('gulp-load-plugins')();

gulp.task('prepare-tmp', function(){
    gulp.src('app/**/*.*')
        .pipe(gulp.dest('.tmp'));
});

gulp.task('replace-tmp', ['prepare-tmp', 'styles'], function(){
    var css = gulp.src('.tmp/styles/*.css')
        .pipe($.replace('HAS_IOS_APP_LINK', 'block'))
        .pipe($.replace('HAS_ANDROID_APP_LINK', 'block'))
        .pipe($.replace('HAS_WEB_APP_LINK', 'block'))
        .pipe($.replace('HAS_TERMS_AND_CONDITIONS', 'block'))
        .pipe(gulp.dest('.tmp/styles'));

    var js = gulp.src('.tmp/scripts/*.js')
        .pipe($.replace('API_URL', process.env.API_URL))
        .pipe(gulp.dest('.tmp/scripts'));

    var html = gulp.src('.tmp/*.html')
        .pipe($.replace('TERMS_AND_CONDITIONS_HTML', '<h1>Terms and conditions</h1>'))
        .pipe($.replace('APPLICATION_NAME', 'ZUP'))
        .pipe($.replace('PAGE_TITLE', 'ZUP - Landing Page'))
        .pipe($.replace('CITY_NAME', 'São Paulo'))
        .pipe(gulp.dest('.tmp/'));

    return merge(css, js, html);
});

gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10
        }))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe($.size());
});

gulp.task('scripts', function () {
    return gulp.src('app/scripts/**/*.js')
        .pipe($.size());
});

gulp.task('html', ['styles', 'scripts'], function () {
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');

    return gulp.src('app/*.html')
        .pipe($.useref.assets({searchPath: '{.tmp,app}'}))
        .pipe(jsFilter)
        .pipe($.uglify())
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest('dist'))
        .pipe($.size());
});

gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'))
        .pipe($.size());
});

gulp.task('fonts', function () {
    return $.bowerFiles()
        .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
        .pipe($.flatten())
        .pipe(gulp.dest('dist/fonts'))
        .pipe($.size());
});

gulp.task('extras', function () {
    gulp.src(['app/data/**/*'])
        .pipe(gulp.dest('dist/data'));

    return gulp
        .src(['app/*.*', '!app/*.html'], { dot: true })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
    return gulp.src(['.tmp', 'dist'], { read: false }).pipe($.clean());
});

gulp.task('build', ['html', 'images', 'fonts', 'extras']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('.tmp'))
        .use(connect.directory('.tmp'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

gulp.task('serve', ['connect', 'replace-tmp'], function () {
    require('opn')('http://localhost:9000');
});

// inject bower components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;

    gulp.src('app/styles/*.scss')
        .pipe(wiredep({
            directory: 'app/bower_components'
        }))
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(wiredep({
            directory: 'app/bower_components',
            exclude: ['bootstrap-sass-official']
        }))
        .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        'app/*.html',
        '.tmp/styles/**/*.css',
        'app/scripts/**/*.js',
        'app/images/**/*'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

    gulp.watch('app/styles/**/*.scss', ['styles', 'replace-tmp']);
    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch('app/images/**/*', ['images']);
    gulp.watch('bower.json', ['wiredep']);
});
