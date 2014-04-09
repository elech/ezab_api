var mongoose = require('mongoose'),
	User = require('../../app/models/user.js'),
	should = require('should');




describe('The user model', function(){
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

	it('Should be defined', function(){
		User.should.be.ok;
	})

	it('should be newable', function(){
		var user = new User();
		user.should.be.ok;
	});

	it('should invalidate an empty user', function(done){
		var user = new User();
		user.validate(function(err){
			err.should.be.ok;
			done();
		});
	});


	describe('Passwords', function(){
		var user,
			plainTextPassword;
		beforeEach(function(done){
			user = new User();
			plainTextPassword = user.password = "secur1e";
			user.name = "James P";
			user.email = "abc@gmail.com";
			done();
		})

		it('should password hash', function(done){
			user.save(function(err){
				user.password.should.not.equal(plainTextPassword)
				user.password.should.be.ok;
				done();
			});
		});

		it('should match a password to a hash', function(done){
			user.save(function(err){
				if(err) return done(err);
				user.comparePassword(plainTextPassword, function(err, match){
					if(err) done(err);
					match.should.be.ok
					done();
				})
			})
		})

		afterEach(function(done){
			user.remove(function(err, usr){
				if(err) return done(err);
				done();
			})
		})
	})

	after(function (done) {
		mongoose.disconnect();
 		return done();
	});
})