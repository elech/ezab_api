var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;

describe('Users route', function(){
	var user = {name: 'Eric L', email: 'eric@gmail.com', password: 'abc123'};
	var user2 = {name: 'James P', email: 'james@gmail.com', password: 'securepassword'};
	
	function syncDB(done){
				models.sequelize
					.sync({force: true})
					.complete(function(err){
						if(!!err){
							console.log('err')
						}else{
							done();
						}
					})
			}

	describe('Creating users', function(){	


		describe('valid data', function(){
			
			beforeEach(syncDB);

			it('should send a 201', function(done){
				request(app)
					.post('/users')
					.send(user)
					.expect(201)
					.end(function(err, res){
						if(err) return done(err);
						done();
					});
			});
		});

	});

	describe('Getting users', function(){
		var knownUser;
		before(syncDB);
		before(function(done){
			User.bulkCreate([
					user, user2
				]).success(function(){
					User.findAll()
						.success(function(users){
							knownUser = users[0];
							done();
						})
				}).error(function(err){
					return done(err)
				})
		})

		it('should get a user by id', function(done){
			request(app)
				.get('/users/' + knownUser.id)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					console.log(res);
					done()
				})
		})

		afterEach(syncDB)
	})

	after(function(){
		app.close();
	});
});