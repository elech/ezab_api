var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		'ezab',
		'root',
		'toor'
	);

var models = [
	'User',
	'WebProperty'
];

models.forEach(function(model){
 module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m){
	m.User.hasMany(m.WebProperty);
	m.WebProperty.belongsTo(m.User);
})(module.exports);

module.exports.sequelize = sequelize;