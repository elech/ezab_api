var when = require('when');
var fs = require('fs');

module.exports = function(sequelize, DataTypes){
	
	function wrapFunctions(prop){
		var promise = when.promise(function(resolve, reject, notify){
			var jsonString = JSON.stringify(prop.campaigns),
				funcRegexp = /"(code|start|success)":"([^,]+)"/g;
			var newObj = jsonString.replace(funcRegexp, function(match, p1, p2){
				return '"' + p1 + '":function(){' + p2.replace(/\\/g, "") +'}';
			})
			resolve(newObj);
		})

		return promise;
	}

	function insertIntoEZABScript(campaignArrString){
		var campArrRegex = /EZAB.campaigns = (\[\]);/;
		var promise = when.promise(function(resolve, reject, notify){
			fs.readFile(__dirname + '/../public/ezab.js', {encoding: 'utf8'}, function(err, data){
				if(err) return reject(err);
				//console.log(data);
				resolve(data.replace(campArrRegex, "EZAB.campaigns = " + campaignArrString + ";"));
			})
		});
		return promise;
	}

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
		}).then(function(prop){
			return wrapFunctions(prop)
		}).then(function(campaignArrString){
			return insertIntoEZABScript(campaignArrString);
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