var Sequelize = require('sequelize');
var sequelize = new Sequelize(
		'ezab',
		'root',
		'toor'
	);

var models = [
	'User'
];

models.forEach(function(model){

 module.exports[model] = sequelize.import(__dirname + '/' + model.toLowerCase());
});

(function(m){
//relationships
})(module.exports);

module.exports.sequelize = sequelize;