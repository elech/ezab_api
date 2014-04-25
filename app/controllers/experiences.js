module.exports = function(app){
	var User = app.get('models').User;
	var Campaign = app.get('models').Campaign;
	var Experience = app.get('models').Experience;
	var Sequelize = app.get('models').sequelize;
	

	function _list(req, res){
		req.user.getWebproperties({
			where:{
				'webproperties.id': req.params.propid,
				'campaigns.id': req.params.cid
			},
			include: [{
				model: Campaign,
				include: [Experience]
			}]
		}).then(function(webprop){
			if(!webprop) return res.send(404);
			res.send(200, webprop[0].campaigns[0].experiences);
		}, function(err){
			res.send(400, err);
		})
	}

	function _get(req, res){

		Experience.findExperience({propid: req.params.propid, cid: req.params.cid, eid:req.params.eid, uid: req.user.get('id')}).then(function(exp){
			if(!exp) return res.send(404);
			res.send(200, exp);
		}, function(err){
			res.send(400, err);
		})
	}

	function _create(req, res){
		req.user.getWebproperties({
			where:{
				'webproperties.id': req.params.propid,
				'campaigns.id': req.params.cid
			},
			include: [Campaign]
		}).then(function(prop){
			if(!prop) return res.send(404);
			return Experience.create({
				name: req.body.name,
				code: req.body.code,
				campaignId: req.params.cid
			});
		}, function(err){
			//db err
			return res.send(500, err);
		}).then(function(exp){
			//success
			return res.send(201, exp);
		}, function(err){
			//validate failed
			return res.send(400, err);
		})
	}

	function _edit(req, res){
		Experience.findExperience({propid: req.params.propid, cid: req.params.cid, eid:req.params.eid, uid: req.user.get('id')}).then(function(exp){
			if(!exp) return res.send(404);
			if(req.body.name !== void 0) exp.name = req.body.name;
			if(req.body.code !== void 0) exp.code = req.body.code;
			return exp.save();
		}, function(err){
			//db err
			return res.send(500, err);
		}).then(function(savedExp){
			//saved
			return res.send(200, savedExp);
		}, function(err){
			//validation err
			return res.send(400, err)
		})
	}

	function _del(req, res){
		res.send(200);
		Experience.findExperience({propid: req.params.propid, cid: req.params.cid, eid:req.params.eid, uid: req.user.get('id')}).then(function(exp){
			if(!exp) return res.send(404);
			return exp.destroy();
		}, function(err){
			//db err
			return res.send(500, err)
		}).then(function(){
			//deleted
			return res.send(200);
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