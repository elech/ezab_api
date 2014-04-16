module.exports = function(sequelize, DataTypes){
	return sequelize.define('Campaign', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [3, 255] }
		},
		start: {
			type: DataTypes.TEXT,
			notEmpty: true
		},
		success: {
			type: DataTypes.TEXT,
			notEmpty: true
		}
	}, {
		tableName: 'campaigns'
	});
}