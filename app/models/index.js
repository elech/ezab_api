var Sequelize = require('sequelize');

console.log(process.env.NODE_ENV);
var sequelize = new Sequelize(
		'ezab',
		'root',
		'toor', {
			logging: (process.env.NODE_ENV == 'development' ? true : false )
		}
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
	m.WebProperty.hasMany(m.Campaign);
	m.Campaign.belongsTo(m.WebProperty);
})(module.exports);

module.exports.sequelize = sequelize;
