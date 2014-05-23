var models = require('../app/models'),
	User = models.User,
	WebProperty = models.WebProperty,
	Campaign = models.Campaign,
	Experience = models.Experience,
	Beacon = models.Beacon,
	when = require('when');

var demoUser = {name: 'Demo1', email: 'demo1@gmail.com', password: 'password', confirm: 'password'};
var demoProp = {name: 'Amazon', url: 'http://amazon.com'};
var demoCampaign = {name: 'Homepage', start: 'return window.location.href === "/";', success: 'return window.location.href === "/thankyou";'};
var demoExp = {name: 'Red buy it now', code: 'document.querySelector("#buy-btn").style.background="red";'};

function createDemo(){
	var createdProp
		, createdCamp
		, createdExp
	var promise = when.promise(function(resolve, reject, notify){
		User.salt(demoUser).then(function(user){
			demoProp.userId = user.id;
			return WebProperty.create(demoProp);
		}, reject).then(function(webprop){
			createdProp = webprop;
			demoCampaign.webpropertyId = webprop.id
			return Campaign.create(demoCampaign);
		}, reject).then(function(camp){
			createdCamp = camp;
			demoExp.campaignId = camp.id
			return Experience.create(demoExp);
		}, reject).then(function(exp){
			createdExp = exp;
			return when.all(
				//exp
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'success'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'success'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: createdExp.id, event: 'success'}),

				//default
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'start'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'success'}),
				Beacon.create({campaignId: createdCamp.id, experienceId: 0, event: 'success'})				
				);
		}, reject).then(function(res){
			resolve();
		}, reject)
	});
	return promise;
}
exports.createDemo = createDemo;