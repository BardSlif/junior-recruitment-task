const gulp = require("gulp");
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

gulp.task("watch", () => {
  gulp.watch('./frontend/styles/scss/**.scss', ['styles']);
  gulp.watch("./frontend/*.html").on('change', browserSync.reload);
  gulp.watch("./frontend/js/**.js").on('change', browserSync.reload);
  browserSync.init({
    server: "./frontend"
  });
});


gulp.task("styles", () => {
  gulp.src('./frontend/styles/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./frontend/styles/css'))
    .pipe(browserSync.stream());
});