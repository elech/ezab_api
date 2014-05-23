var app = require('../../app/app.js');
var request = require('supertest');
var expect = require('chai').expect;
var models = require('../../app/models');

describe('Beacon route', function(){
	var apiV1Endpoint = "/api/v1";
	it('should handle the image get request', function(done){
		request(app)
			.get(apiV1Endpoint +'/beacon?event=start&cid=2&eid=3')
			.expect(204)
			.end(function(err, res){
				if(err) return done(err);
				return done();
			})
	})

	it('should place an entry into the database', function(){
		
	})
});