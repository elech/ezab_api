module.exports = function(sequelize, DataTypes){
	return Experience = sequelize.define('Experience', {
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
		tableName: 'experiences',
		classMethods: {
			findExperience: function(args){
				var QUERY = 'SELECT e.id, e.name, e.code, e.createdAt, e.updatedAt FROM users u ' +
					'JOIN webproperties as prop ON u.id = prop.userId ' +
					'JOIN campaigns as c ON prop.id = c.webpropertyId ' +
					'JOIN experiences as e on c.id = e.campaignId ' +
					'WHERE prop.id = :propid AND c.id = :cid AND e.id = :eid AND u.id = :uid';

				return sequelize.query(QUERY, Experience, {raw: false, plain: true},{
					propid: args.propid,
					cid: args.cid,
					eid: args.eid,
					uid: args.uid
				})
			}
		}
	});
}