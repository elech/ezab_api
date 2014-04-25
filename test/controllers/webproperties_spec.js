var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');
var seed = require('../../config/seed.js');
var when = require('when');
var User = models.User,
	WebProp = models.WebProperty;

describe('Web Properties route', function(){
	var wuser, token;

	before(function(done){
		User.find({where:{email: 'quin@gmail.com'}, include: [WebProp]}).then(function(user){
			wuser = user;
			done()
		}, done)
	})


	before(function(done){
		request(app)
			.post('/tokens')
			.send({email: 'quin@gmail.com', password: 'password'})
			.expect(201)
			.end(function(err, res){
				if(err) return done(err);
				token = res.body.token;
				done(); 
			})
	})


	describe('Getting', function(){
		it('should get an array of properties', function(done){
			request(app)
				.get('/webproperties')
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body).to.be.instanceOf(Array);
					expect(res.body).to.have.length(1);
					done();
				})
		})

		it('should get a single property', function(done){
			request(app)
				.get('/webproperties/' + wuser.webproperties[0].get('id'))
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.id).to.equal(wuser.webproperties[0].get('id'));
					done();
				})
		})
	})

	describe('Creating', function(){
		it('should send a 201', function(done){
			request(app)
				.post('/webproperties')
				.set('Authorization', 'Bearer ' + token)
				.send({name: 'MyNewProp', url: 'http://www.valid.com'})
				.expect(201)
				.end(function(err, res){
					if(err) return done(err);
					done();
				})
		})
	})

	describe('Editing', function(){
		var prop2edit;
		before(function(done){
			WebProperty.create({
				name: 'newWebPropOverHere',
				url: 'http://www.domain.com',
				userId: wuser.id
			}).then(function(prop){
				prop2edit = prop
				done();
			}, done);
		})

		it('should edit a web property', function(done){
			var newName = "newPropNameHERE";
			request(app)
				.put('/webproperties/' + prop2edit.id)
				.set('Authorization', 'Bearer ' + token)
				.send({name: newName})
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					expect(res.body.name).to.equal(newName);
					done()
				})
		})
	})

	describe('Deleting', function(){
		var prop2del;
		before(function(done){
			WebProperty.create({
				name: 'Delte web prop',
				url: 'http://www.delete.com',
				userId: wuser.id
			}).then(function(prop){
				prop2del = prop;
				done();
			}, done)
		})

		it('should delete a property', function(done){
			request(app)
				.del('/webproperties/' + prop2del.id)
				.set('Authorization', 'Bearer ' + token)
				.expect(200)
				.end(function(err, res){
					if(err) return done(err);
					done();
				})
		})
	})

});