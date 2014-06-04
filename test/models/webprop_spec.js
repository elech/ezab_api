var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var WebProperty = models.WebProperty
var fs = require('fs');
var crypto = require('crypto');
describe('WebProperty model', function(){

	it('should be defined', function(){
		expect(WebProperty).to.exist;
	});

	describe('Publishable', function(){
		var createdProp
			, filePath;
		before(function(done){
			WebProperty.create({
				name: 'Publishingit',
				url: 'http://publishit.com',
				userId: 1
			}).then(function(prop){
				createdProp = prop;
				filePath = '../cdn_ezab/ezab.' + crypto.createHash('sha1').update(createdProp.id.toString()).digest('hex') + '.js';
				console.log(filePath);
				return WebProperty.publishable(1, createdProp.id);
			}, done).then(function(fileName){
				done();
			}, done);
		})

		after(function(done){
			fs.unlink(filePath, function(err){
				if(err) return done(err);
				fs.exists(filePath, function(exists){
					expect(exists).to.be.false;
					console.log(filePath);
					console.log(exists);
					done();
				})
			})
		})
		
		it('should move the file to the cdn', function(done){
			fs.exists(filePath, function(exists){
				console.log(filePath);
				expect(exists).to.be.true;
				done();
			});
		});
	});
});