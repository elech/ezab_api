var models = require('../app/models'),
	User = models.User,
	when = require('when');

var user1 = {name: 'Eric L', email: 'eric@gmail.com', password: 'password', confirm: 'password'}
var user2 = {name: 'James P', email: 'james@gmail.com', password: 'password123', confirm: 'password123'}
var user3 = {name: 'Jon S', email: 'jon@gmail.com', password: 'supersecure', confirm: 'supersecure'}

var promise = when.promise(function(resolve, reject, notify) {
    // Do some work, possibly asynchronously, and then
    // resolve or reject.  You can notify of progress events
    // along the way if you want/need.
		var seed = {};
		models.sequelize.sync({force: true}).complete(function(err){
			if(err) return reject(err);
			when.all(User.salt(user1), User.salt(user2), User.salt(user3)).then(function(){
				User.findAll()
					.success(function(users){
						seed.users = users;
						resolve(seed);
					}, reject)				
			}, reject)
		})

    // or resolve(anotherPromise);
    // or reject(nastyError);
});


module.exports = function(){
	return promise;
}




