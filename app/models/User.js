var when = require('when'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;

module.exports = function(sequelize, DataTypes){
	var User;
	
	function genSalt(password){
		var promise = when.promise(function(resolve, reject, notify){
			bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
			    if (err) return reject(err);
			    // hash the password using our new salt
			    bcrypt.hash(password, salt, function(err, hash) {
			        if (err) return reject(err);
			        // override the cleartext password with the hashed one
			        return resolve(hash);
			    });
			});
		})
		return promise;
	}

	return User = sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [3, 64] }
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			},
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'users',
		classMethods: {
			salt: function(args){
				var promise = when.promise(function(resolve, reject, notify) {
					
					if(args.password !== args.confirm) return reject(new Error("Passwords no match"));
					var user = User.build({
						name: args.name,
						email: args.email,
						password: args.password
					})

					if(user.validate()) return reject(user.validate());
					genSalt(args.password).then(function(hash){
						user.set('password', hash);
						user.save().then(function(user){
							resolve(user);
						}, reject)
					}, reject);

				});
				return promise;	
			}
		},
		instanceMethods: {
			comparePassword: function(candidate){
				var that = this;
				var promise = when.promise(function(resolve, reject, notify) {
					bcrypt.compare(candidate, that.password, function(err, match){
						if(err) return reject(err);
						return resolve(match);
					})
				});
				return promise;
			}, 
		}
	});
}