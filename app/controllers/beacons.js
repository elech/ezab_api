module.exports = function(app){
	var Beacon = app.get('models').Beacon;
	function _get(req, res){
		console.log(req.query);
		Beacon.create({
			campaignId: req.query.cid,
			experienceId: req.query.eid,
			event: req.query.event
		})//do nothing????
		res.send(204);
	}

	return {
		get: _get
	}
}