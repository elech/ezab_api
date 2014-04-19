var models = require('../app/models'),
	User = models.User,
	WebProperty = models.WebProperty,
	when = require('when');

var user1 = {name: 'Eric L', email: 'eric@gmail.com', password: 'password', confirm: 'password'}
var user2 = {name: 'James P', email: 'james@gmail.com', password: 'password123', confirm: 'password123'}
var user3 = {name: 'Jon S', email: 'jon@gmail.com', password: 'supersecure', confirm: 'supersecure'}

var user4 = {name: 'Quiin', email: 'quin@gmail.com', password: 'password', confirm: 'password'};
var goodProp = {name: 'BRS', url: 'http://www.amazon.com'}





function userWebProp(){
	var promise = User.salt(user4).then(function(user){
		goodProp.userId = user.id;
		return WebProperty.create(goodProp);
	});
	return promise;
}

function syncTheDB(){
	return models.sequelize.sync({force: true}).then(function(){
		return when.all(User.salt(user1), User.salt(user2), User.salt(user3), userWebProp())
	});
}
exports.syncTheDB = syncTheDB;