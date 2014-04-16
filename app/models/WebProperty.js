module.exports = function(sequelize, DataTypes){
	return sequelize.define('WebProperty', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [3, 64] }
		},
		url: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isUrl: true
			}
		}
	}, {
		tableName: 'webproperties'
	});
}