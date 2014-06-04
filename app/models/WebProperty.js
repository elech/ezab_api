var when = require('when');
var fs = require('fs');
var crypto = require('crypto');
var SCRIPT_URL = "//cdn.ezab.org/ezab.";



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

	function insertIntoEZABScript(campaignArrString, propid){
		var campArrRegex = /EZAB.campaigns = (\[\]);/;
		var promise = when.promise(function(resolve, reject, notify){
			fs.readFile(__dirname + '/../../../ezab_script/ezab.js', {encoding: 'utf8'}, function(err, data){
				if(err) return reject(err);
				data.replace(campArrRegex, "EZAB.campaigns = " + campaignArrString + ";")
				var shasum = crypto.createHash('sha1').update(propid.toString());
				var fileName = 'ezab.' + shasum.digest('hex') + '.js';
				fs.writeFile('../cdn_ezab/' + fileName, data, function(err){
					if(err) return reject(err);
					resolve(fileName);
				})
			})
		});
		return promise;
	}

	function _publishable(userId, propId){	
		var foundprop;
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
			foundprop = prop;
			return wrapFunctions(prop)
		}).then(function(campaignArrString){
			return insertIntoEZABScript(campaignArrString, foundprop.id);
		})
	}

	//Fetches a single web property, appending a virtual property scriptURL
	function _getSingleWebProp(userId, propId){
		var promise = when.promise(function(resolve, reject, notify){
			WebProperty.find({
				where: {
					userId: userId,
					id: propId
				}
			}).then(function(webprop){
				if(!webprop) return resolve(null);
				var json_res = webprop.toJSON();
				json_res.scriptUrl = SCRIPT_URL + crypto.createHash('sha1').update(webprop.id.toString()).digest('hex') + ".js";
				resolve(json_res);
			}, reject);
		});

		return promise;
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
			publishable: _publishable,
			getSingleWebProp: _getSingleWebProp
		}
	});
}