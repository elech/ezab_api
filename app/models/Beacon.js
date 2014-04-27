module.exports = function(sequelize, DataTypes){
	return sequelize.define('Beacon', {
		campaignId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {min: 1}
		},
		experienceId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {min: 1}
		},
		event: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'beacons',
		validate:{
			eventStartOrSuccess: function(){
				console.log(this.event);
				if(this.event !== 'start' && this.event !== 'success'){
					throw new Error('Must be either start or success');
				}
			}
		}
	});
}