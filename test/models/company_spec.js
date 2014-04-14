var mongoose = require('mongoose'),
	Company = require('../../app/models/company.js'),
	User = require('../../app/models/user.js'),
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


	it('should should exist', function(){
		Company.should.be.ok;
	});	

	describe('validations', function(){
		var company;
		beforeEach(	function(){
			company = new Company();
		})

		it('should require a name', function(done){
			company.validate(function(err){
				err.should.be.ok;
				err.errors.name.type.should.eql('required');
				done();
			});
		});
	});

	describe('Users subdocument', function(){
		var user1, user2, company;
		
		beforeEach(function(done){
			var usr1 = new User({
				name: 'Eric',
				email: 'e@gmail.com',
				password: 'password'
			});

			var usr2 = new User({
				name: 'James',
				email: 'j@gmail.com',
				password: 'password'
			})
			company = new Company();
			company.name = "ABC";
			usr1.save(function(err){
				if(err) return done(err)
				usr2.save(function(err){
					if(err) return done(err);
					company.users.push({user: usr1._id, role: 'admin'});
					company.save(function(err){
						if(err) return done(err);
						//console.log(company)
						done();
					})
				})
			})
		});

		it('should find users who are admins', function(done){
			Company.findOne({name: 'ABC'})
				.populate({
					path: 'users.user',
					match: {email: 'e@gmail.com'}
				})
				.exec(function(err, company){
					if(err) return done(err);
					console.log(company.users[0]);
					done();
				})
		});

		//it('should')

	})

	after(function (done) {
		mongoose.disconnect();
 		return done();
	});
})