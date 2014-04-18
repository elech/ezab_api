var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var seed = require('../../config/seed.js');
describe('User model', function(){

	beforeEach(function(done){
		seed().then(function(seed){
			users = seed.users;
			done();
		}, function(err){
			done(err);
		})
	})

	it('should be defined', function(){
		expect(User).to.exist;
	});

	describe('Validations', function(){
		var user;

		it('should validate names less than 3', function(){
			user = User.build({name: 'Ja'});
			expect(user.validate()['name']).to.exist;
		});

		it('should validate email', function(){
			user = User.build({name: 'James', email: 'james@gmail.com'})
			expect(user.validate()).to.not.exist;
			user.email = 'aol@aolcom';
			expect(user.validate()).to.exist;
		});

	});

	describe('Password hashing', function(){
		var userDeets = {name: 'Eric C', email: 'ee@gmail.com', password: 'password', confirm: 'password'};

		beforeEach(function(done){
			seed().then(function(seed){
				users = seed.users;
				done();
			}, function(err){
				done(err);
			})
		})

		it('should take a password and hash it', function(done){
			User.salt(userDeets)
			.then(function(user){
				expect(user.get('password')).to.not.equal(userDeets.password);
				done();
			}, done);
		})

		it('should be able to match hash & password', function(done){
			User.find({where: {email: userDeets.email}}).then(function(user){
				if(!user) return done('User not found');
				user.comparePassword(userDeets.password).then(function(match){
					expect(match).to.be.ok;
					done();
				}, done)
				
			}, done)
		})
	})
});