module.exports = function(sequelize, DataTypes){
	
	function _publishable(userId, propId){
/*		var QUERY = 'SELECT c.name, c.start, c.success, c.id, e.id, e.code FROM users u ' +
			'JOIN webproperties as prop ON u.id = prop.userId ' +
			'LEFT JOIN campaigns as c ON prop.id = c.webpropertyId ' +
			'LEFT JOIN experiences as e on c.id = e.campaignId ' +
			'WHERE prop.id = :propid AND u.id = :uid GROUP BY prop.id, c.id, e.id';

		return sequelize.query(QUERY, null, {raw: true},{
			propid: propId,
			uid: userId
		})*/
		return WebProperty.find({
			where: {
				userId: userId,
				id: propId
			},
			include: [{
				model: sequelize.model('Campaign'),
				include: [sequelize.model('Experience')]
			}]
		})
	}


	return WebProperty = sequelize.define('WebProperty', {
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
		tableName: 'webproperties',
		classMethods: {
			publishable: _publishable
		}
	});
}