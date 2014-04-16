var Bookshelf = require('bookshelf').DB;

var User = Bookshelf.Model.extend({
	tableName: 'users',
	constructor: function(){
		Bookshelf.Model.apply(this, arguments);
		this.on('saving', function(model, attrs, options){
			console.log('saving');
		})
	}
})

var Users = Bookshelf.Collection.extend({
	model: User,
	constructor: function(){
		//Bookshelf.Collection.apply(this, arguments)
	}
})


exports.model = User;