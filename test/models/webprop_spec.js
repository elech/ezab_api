var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
var WebProperty = models.WebProperty
var fs = require('fs');
describe('WebProperty model', function(){

	it('should be defined', function(){
		expect(WebProperty).to.exist;
	});

	describe('Publishable', function(){
		it('should return all the data related to a webproperty', function(done){
			done();
//			WebProperty.publishable(5, 2).then(function(obj){
				
/*				fs.writeFile('obj.json', obj, function(err){
					if(err) throw err;
					done()
				})*/
				
				//expect(obj).to.exist;
/*				var campaigns = obj.campaigns
				var jsonString = JSON.stringify(campaigns);
				//TODO tighten this up, won't catch weird cases
				var re = /"(code|start|success)":"([^,]+)"/g;
				var newObj = jsonString.replace(re, function(match, p1, p2){
					return '"' + p1 + '":function(){' + p2.replace(/\\/g, "") +'}';
				})

*/

//			}, done)
		})
	});
});