var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		'ezab',
		'root',
		'toor'
	);

var models = [
	'User',
	'WebProperty',
	'Campaign'
];

models.forEach(function(model){
 module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m){
	m.User.hasMany(m.WebProperty);
	m.WebProperty.belongsTo(m.User);
})(module.exports);

sequelize
	.sync({force: true})
	.complete(function(err){
		if(err){
			console.log('err in sequelize')
		}else{
			module.exports.sequelize = sequelize;
		}
	})

