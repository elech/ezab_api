module.exports = function(sequelize, DataTypes){
	return sequelize.define('Experience', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [3, 255] }
		},
		code: {
			type: DataTypes.TEXT,
			notEmpty: true
		}
	}, {
		tableName: 'experiences'
	});
}