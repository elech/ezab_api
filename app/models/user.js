var Bookshelf = require('bookshelf').DB;


exports.model = Bookshelf.Model.extend({
	tableName: 'users',
})


var userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, index: {unique: true}},
	password: {type: String, required: true},
	created_at: {type: Date, default: Date.now},
	updated_at: {type: Date, default: Date.now}
});

userSchema.pre('save', function(next){
	var user = this;
	this.updated_at = Date.now;
	if(!user.isModified('password')) return next();
	
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next(err);

			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidate, cb){
	bcrypt.compare(candidate, this.password, function(err, match){
		if(err) return cb(err);
		cb(null, match);
	})
}

module.exports = mongoose.model('User', userSchema);