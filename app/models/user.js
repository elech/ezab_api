module.exports = function(sequelize, DataTypes){
	return sequelize.define('User', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { len: [3, 64] }
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		}
	}, {
		tableName: 'users'
	});
}