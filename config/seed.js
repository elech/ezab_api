var models = require('../app/models'),
	User = models.User,
	when = require('when');

var user1 = {name: 'Eric L', email: 'eric@gmail.com', password: 'password'}
var user2 = {name: 'James P', email: 'james@gmail.com', password: 'password123'}
var user3 = {name: 'Jon S', email: 'jon@gmail.com', password: 'supersecure'}

var promise = deferred.promise;

models.sequelize.sync({force: true}).complete(function(err){
	if(err) throw err;
	User.bulkCreate([user1, user2, user3])
		.success(function(users){
			promise.resolve(users);
		})
		.error(function(err){
			promise.reject(err);
		});
})


module.exports = function(){
	return promise;
}




