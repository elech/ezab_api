module.exports = function(app){
	var WebProperty = app.get('models').WebProperty;
	
	function _list(req, res){
		req.user.getWebproperties().then(function(props){
			return res.send(200, props);
		}, function(err){
			return res.send(500, err);
		})	
	}

	function _get(req, res){
		req.user.getWebproperties({where:{id: req.params.id}}).then(function(prop){
			if(!prop || prop.length !== 1) return res.send(404);
			return res.send(200, prop[0]);
		}, function(err){
			return res.send(500, err);
		})
	}

	function _create(req, res){
		WebProperty.create({
			name: req.body.name,
			url: req.body.url,
			userId: req.user.get('id')
		}).then(function(prop){
			return res.send(201, prop);
		}, function(err){
			return res.send(400, err);
		});
	}

	function _edit(req, res){
		var webprop;
		WebProperty.find({
			where: {
				id: req.params.propid,
				userId: req.user.get('id')
			}
		}).then(function(prop){
			if(!prop) return res.send(404);
			webprop = prop;
			if(req.body.name !== void 0) webprop.name = req.body.name;
			if(req.body.url !== void 0) webprop.url = req.body.url;
			return webprop.save();
		}, function(err){
			//dberr
			return res.send(500, err);
		}).then(function(){
			//saved
			return res.send(200, webprop);
		}, function(err){
			//validaiton err
			return res.send(400, err)
		})
	}

	function _del(req, res){
		WebProperty.find({
			where: {
				id: req.params.propid,
				userId: req.user.get('id')
			}
		}).then(function(prop){
			if(!prop) return res.send(404);
			return prop.destroy();
		}, function(err){
			//db err
			return res.send(500, err);
		}).then(function(){
			//deleted
			return res.send(200);
		}, function(){
			//failed 2 del
			return res.send(500); //right status code?
		})
	}

	function _publish(req, res){
		//WebProperty.publishable()
		res.send(200);
	}

	

	return {
		list: _list,
		get: _get,
		create: _create,
		edit: _edit,
		del: _del
	}

}