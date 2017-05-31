var gulp = require('gulp'),
    eslint = require('gulp-eslint'),
    debug = require('gulp-debug'),
    clean = require('gulp-clean'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    htmlmin = require('gulp-htmlmin'),
    gulpSequence = require('gulp-sequence'),
    imagemin = require('gulp-imagemin');

gulp.task('pack-typo', () =>
    gulp.src('src/typo/**/*')
        .pipe(debug({title: 'Pack-typo Task (Scope):'}))
        .pipe(gulp.dest('public/typo'))
);

gulp.task('pack-img', () =>
    gulp.src('src/img/**/*')
        .pipe(debug({title: 'Pack-img Task (Scope):'}))
        .pipe(imagemin())
        .pipe(gulp.dest('public/img'))
);

gulp.task('pack-html', function() {
    return gulp.src('src/*.html')
    .pipe(debug({title: 'Pack-HTML Task (Scope):'}))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('public'));
});


gulp.task('pack-js', ['lint'], function (cb) {
    pump([
        gulp.src('src/js/**/*.js')
        .pipe(debug({title: 'Pack-js Task (Scope):'})),
        uglify(),
        gulp.dest('public/js')
    ], cb);
});


gulp.task('pack-css', function () { 
    return gulp.src('src/css/**/*.css')
        .pipe(debug({title: 'Pack-css Task (Scope):'}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'))
});

gulp.task('clean', function () {
    return gulp.src('public', {read: false})
        .pipe(debug({title: 'Clean Task (Scope):'}))
        .pipe(clean());
});

gulp.task('lint', function() {
    var filesToLint = [
        '**/*.js',
        '!tests/protractor.conf.js',
        '!dist/**/*',
        '!docs/**/*',
        '!node_modules/**/*',
        '!tmp/**/*',
        '!coverage/**/*',
        '!public/**/*'
    ];

    return gulp.src(filesToLint)
            .pipe(debug({title: 'Linter task (Scope):'}))
            .pipe(eslint())
            .pipe(eslint({fix:true}))
            .pipe(eslint.format())
            .pipe(gulp.dest('.'));
});

gulp.task('default', gulpSequence('clean', ['pack-css', 'pack-js', 'pack-html', 'pack-img', 'pack-typo']));