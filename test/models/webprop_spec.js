var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var WebProperty = models.WebProperty
describe('WebProperty model', function(){

	it('should be defined', function(){
		expect(WebProperty).to.exist;
	});

	describe('Publishable', function(){
		it('should return all the data related to a webproperty', function(done){
			WebProperty.publishable(5, 2).then(function(obj){
				expect(obj).to.exist;
				done();
			}, done)
		})
	});
});