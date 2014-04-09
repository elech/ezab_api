var mongoose = require('mongoose'),
	User = require('../../app/models/company.js'),
	should = require('should');




describe('The company model', function(){
	beforeEach(function (done) {

	 function clearDB() {
	   for (var i in mongoose.connection.collections) {
	     mongoose.connection.collections[i].remove(function() {});
	   }
	   return done();
		}

		if (mongoose.connection.readyState === 0) {
			mongoose.connect('mongodb://localhost:27017/test', function (err) {
	    	if (err) {
	      	throw err;
	    	}
	    	return clearDB();
	   	});
	 	}else{
	  	return clearDB();
	 	}
	});

	it('should should exist', function(done){

	})

	after(function (done) {
		mongoose.disconnect();
 		return done();
	});
})