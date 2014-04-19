var gulp = require('gulp');
var gulputil = require('gulp-util');
var mocha = require('gulp-mocha');
var seed = require('./config/seed.js');
var batch = require('gulp-batch')

var appFiles = [
  'app/**/*.js',
  'app/*.js'
];

var testFiles = [
  'test/*.js',
  'test/**/*.js'
]

gulp.task('default', function(){
  gulp.watch(appFiles.concat(testFiles), batch({timeout: 10}, function(events){

  })).on('change', function(events){
      seed.syncTheDB().then(function(){
        gulp.src(appFiles.concat(testFiles)).pipe(mocha({reporter: 'spec'}))
          .on('error', function(err){
            console.log('err');
            console.log(err.toString())
            this.emit('end');
          })
      })
  })
});