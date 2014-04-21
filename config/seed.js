var models = require('../app/models'),
	User = models.User,
	WebProperty = models.WebProperty,
	Campaign = models.Campaign,
	when = require('when');

var user1 = {name: 'Eric L', email: 'eric@gmail.com', password: 'password', confirm: 'password'}
var user2 = {name: 'James P', email: 'james@gmail.com', password: 'password123', confirm: 'password123'}
var user3 = {name: 'Jon S', email: 'jon@gmail.com', password: 'supersecure', confirm: 'supersecure'}

var user4 = {name: 'Quiin', email: 'quin@gmail.com', password: 'password', confirm: 'password'};
var goodProp = {name: 'BRS', url: 'http://www.amazon.com'}

var user5 = {name: 'experienceGuy', email: 'exp@gmail.com', password: 'password', confirm: 'password'};
var expProp = {name: 'Amazon', url: 'http://aws.amazon.com'};
var campaign = {name: 'HomePage', start: 'return window.location.pathname === "/"', success: 'return window.location.pathname === "/thankyou"'};
var experience = {name: 'Page left', code: '$("#main").empty();'};


function experienceUser(){
	
	return User.salt(user5)
	.then(function(savedUser5){
		return WebProperty.create({name: expProp.name, url: expProp.url, userId: savedUser5.id})
	}).then(function(savedExpProp){
		return Campaign.create({name: campaign.name, start: campaign.start, success: campaign.success, webpropertyId: savedExpProp.id})
	}).then(function(savedCampaign){
		return Experience.create({name: experience.name, code: experience.code, campaignId: savedCampaign.id});
	})
}

function userWebProp(){
	var promise = User.salt(user4).then(function(user){
		goodProp.userId = user.id;
		return WebProperty.create(goodProp);
	});
	return promise;
}

function syncTheDB(){
	return models.sequelize.sync({force: true}).then(function(){
		return when.all(User.salt(user1), User.salt(user2), User.salt(user3), userWebProp(), experienceUser())
	});
}
exports.syncTheDB = syncTheDB;