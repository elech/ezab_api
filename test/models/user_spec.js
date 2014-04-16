var expect = require('chai').expect;
var models = require('../../app/models');
var User = models.User;
describe('User model', function(){

	it('should be defined', function(){
		//console.log(User)
		expect(User).to.exist;
	})

	describe('Validations', function(){
		var user;

		it('should validate names less than 3', function(){
			user = User.build({name: 'Ja'});
			expect(user.validate()['name']).to.exist;
		})

		it('should validate email', function(){
			user = User.build({name: 'James', email: 'james@gmail.com'})
			expect(user.validate()).to.not.exist;
			user.setDataValue('email', 'aol@aolcom');
			expect(user.validate()).to.exist;
		});

	});
});