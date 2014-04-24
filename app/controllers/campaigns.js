module.exports = function(app){
	var User = app.get('models').User;
	var Campaign = app.get('models').Campaign;
	var WebProperty = app.get('models').WebProperty;

	function _list(req, res){
		req.user.getWebproperties({where: {'webproperties.id': req.params.propid}, include: [Campaign]}).then(function(prop){
			if(!prop || prop.length !== 1) return res.send(404);
			return res.send(200, prop[0].campaigns);
		}, function(err){
			return res.send(500, err);
		})
	}

	function _get(req, res){
		req.user.getWebproperties({
			where: {
				'webproperties.id': req.params.propid,
				'campaigns.id': req.params.cid
			},
			include: [{
				model: Campaign	
			}]
		}).then(function(prop){
			if(!prop || prop.length !== 1) return res.send(404);
			return res.send(200, prop[0].campaigns[0]);
		}, function(err){
			return res.send(500, err);
		})
	}

	function _create(req, res){
		Campaign.create({
			name: req.body.name,
			webpropertyId: req.params.propid,
			start: req.body.start,
			success: req.body.success
		}).then(function(camp){
			return res.send(201, camp);
		}, function(err){
			return res.send(500, err);
		})
	}

	function _edit(req, res){
		var campaign;
		req.user.getWebproperties({
			where: {
				'webproperties.id': req.params.propid,
				'campaigns.id': req.params.cid
			},
			include: [{
				model: Campaign	
			}]
		}).then(function(webprop){
			if(!webprop) return res.send(404);
			campaign = webprop[0].campaigns[0]
			if(req.body.name !== void 0) campaign.name = req.body.name;
			if(req.body.start !== void 0) campaign.start = req.body.start;
			if(req.body.success !== void 0) campaign.success = req.body.success;
			return campaign.save()
		}, function(err){
			//db err
			return res.send(500);
		}).then(function(){
			//successful save
			res.send(200, campaign);
		}, function(err){
			//validation error
			return res.send(400, err);
		})
	}

	function _del(req, res){
		req.user.getWebproperties({
			where: {
				'webproperties.id': req.params.propid,
				'campaigns.id': req.params.cid
			},
			include: [{
				model: Campaign	
			}]
		}).then(function(prop){
			if(!prop || prop.length !== 1) return res.send(404);
			return prop[0].campaigns[0].destroy()
		}, function(err){
			return res.send(500, err);
		}).then(function(){
			return res.send(200, {id: req.params.cid});
		})
	}


	return {
		list: _list,
		get: _get,
		create: _create,
		edit: _edit,
		del: _del
	}
}