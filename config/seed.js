var models = require('../app/models'),
	User = models.User,
	when = require('when');

var user1 = {name: 'Eric L', email: 'eric@gmail.com', password: 'password'}
var user2 = {name: 'James P', email: 'james@gmail.com', password: 'password123'}
var user3 = {name: 'Jon S', email: 'jon@gmail.com', password: 'supersecure'}

var promise = when.promise(function(resolve, reject, notify) {
    // Do some work, possibly asynchronously, and then
    // resolve or reject.  You can notify of progress events
    // along the way if you want/need.
		var seed = {};
		models.sequelize.sync({force: true}).complete(function(err){
			if(err) throw err;
			User.bulkCreate([user1, user2, user3])
				.success(function(){
					User.findAll()
						.success(function(users){
							seed.users = users;
							resolve(seed);
						})
				})
				.error(function(err){
					reject(err);
				});
		})

    // or resolve(anotherPromise);
    // or reject(nastyError);
});


module.exports = function(){
	return promise;
}




