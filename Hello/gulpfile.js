var gulp = require('gulp'),
    connect = require('gulp-connect'),
    less = require('gulp-less'),
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel');

//本地服务器
gulp.task('webserver',function(){
    connect.server({
        host: "192.168.152.128",
        livereload:true,
        
    });
});

//babel转义
gulp.task('babel', function(){
    gulp.src('src/*.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest('build/dist'))
})

//less编译
gulp.task('less',function(){
    gulp.src('styles/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(gulp.dest("build/styles"))
    .pipe(connect.reload());
});

//copy文件到相应目录
gulp.task('copy',  function() {
    gulp.src('common/**/*')
    .pipe(gulp.dest("build/common"));
    gulp.src('static/**/*')
    .pipe(gulp.dest("build/static"));
    gulp.src('view/**/*')
    .pipe(gulp.dest("build/view"));
    gulp.src("index.html")
    .pipe(gulp.dest("build"))   
});

//监听文件改动
gulp.task('watch',function(){
    gulp.watch('style/*.less',['less']);
    gulp.watch('src/*.js',['babel']);
    gulp.watch(['common/**/*', "static/**/*", "view/**/*", "index.html"],['copy']);
})

gulp.task('default',["babel", 'less', 'copy', 'webserver', 'watch']);