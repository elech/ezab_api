var gulp = require('gulp');
var gulputil = require('gulp-util');
var mocha = require('gulp-mocha');
var seed = require('./config/seed.js');
var batch = require('gulp-batch');
var when = require('when');

var appFiles = [
  'app/controllers/*.js',
  'app/models/*.js',
  'app/*.js'
];

var testFiles = [
  'test/*.js',
  'test/**/*.js'
]

gulp.task('seed', function(){
  var promise = when.promise(function(resolve, reject, notify){
    seed.syncTheDB().then(function(){
      //professional
      setTimeout(function(){
        resolve(); //let db settle
      }, 500);
    }, reject);
  })
  return promise;
})

gulp.task('test', ['seed'], function(){
  return gulp.src(appFiles.concat(testFiles))
    .pipe(mocha({reporter: 'spec'}))
    .on('error', function(err){
      console.log(err);
      this.emit('end');
    })
})

gulp.task('default', function(){
  gulp.watch(appFiles.concat(testFiles), ['test']);
});

gulp.task('api', function(){
  var app = require('./app/app.js');
});