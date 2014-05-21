var Sequelize = require('sequelize');
var fs = require('fs');
var sequelize = new Sequelize(
		'ezab',
		'root',
		fs.readFileSync('../password.txt', 'utf-8').replace(/\n/, "");, {
			logging: (process.env.NODE_ENV == 'development' ? true : false )
		}
	);

var models = [
	'User',
	'WebProperty',
	'Campaign',
	'Experience',
	'Beacon'
];

models.forEach(function(model){
 module.exports[model] = sequelize.import(__dirname + '/' + model);
});

(function(m){
	m.User.hasMany(m.WebProperty);
	m.WebProperty.belongsTo(m.User);
	m.WebProperty.hasMany(m.Campaign);
	m.Campaign.belongsTo(m.WebProperty);
	m.Campaign.hasMany(m.Experience);
	m.Experience.belongsTo(m.Campaign);
})(module.exports);
//sequelize.sync({force: true});
module.exports.sequelize = sequelize;
