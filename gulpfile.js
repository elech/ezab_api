var gulp = require('gulp');
var gulputil = require('gulp-util');
var mocha = require('gulp-mocha');

var appFiles = [
  'app/**/*.js',
  'app/*.js'
];

var testFiles = [
  'test/*.js',
  'test/**/*.js'
]


gulp.task('default', function(){
  gulp.watch(appFiles.concat(testFiles), ['test'])
})

gulp.task('test', function(){
  gulp.src(testFiles)
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function(err){
      console.log(err);
      this.emit('end');
    })
})