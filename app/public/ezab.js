var EZAB = EZAB || {};
EZAB.campaigns = [];
EZAB.cData = {};
EZAB.BEACON_URL = 'http://54.203.68.32:8000/beacon';
EZAB.COOKIE_NAME = "EZAB";


EZAB.getCookieData = function(){
	var cData = EZAB.docCookies.getItem('EZAB');
	return cData === null ? {} : JSON.parse(cData);
};

EZAB.checkForCampaignStart = function(){
	var i = 0,
		len = EZAB.campaigns.length;
	for(; i < len; i++){
		if(EZAB.campaigns[i].start()){
			if(!EZAB.cData[EZAB.campaigns[i].id] && EZAB.cData[EZAB.campaigns[i].id] !== 0){
				EZAB.joinRandomExperience(EZAB.campaigns[i]);
        EZAB.beaconRequest(EZAB.campaigns[i].id, EZAB.cData[EZAB.campaigns[i].id], 'start');
			}
		}
	}
};

EZAB.checkForCampaignSuccess = function(){
  var i = 0,
    len = EZAB.campaigns.length;
  for(; i < len; i++){
    if(EZAB.campaigns[i].success()){
      EZAB.beaconRequest(EZAB.campaigns[i].id, EZAB.cData[EZAB.campaigns[i].id] || 0, 'success');
    }
  } 
};

EZAB.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/*
	Randomly selects an experience from a campaign
	@params campaign The campaign object to join an experience from
*/
EZAB.joinRandomExperience = function(campaign){
	var expLength = campaign.experiences.length,
		randomExperience = EZAB.getRandomInt(0, expLength);
	/*control*/
	if(randomExperience === expLength){
		EZAB.cData[campaign.id] = 0;
	}else{/*test*/
		EZAB.cData[campaign.id] = campaign.experiences[randomExperience].id
	}
  EZAB.docCookies.setItem(EZAB.COOKIE_NAME, JSON.stringify(EZAB.cData));
};

EZAB.executeExperiences = function(){
	var campaignIds = Object.keys(EZAB.cData),
		len = campaignIds.length,
		i = 0;
	for(; i < len; i++){
		if(EZAB.cData[campaignIds[i]] !== 0){
			var campaign = EZAB.campaigns.filter(function(val, index, campaigns){
				return val.id == campaignIds[i];
			})[0];
			campaign.experiences.filter(function(exp, index, exps){
				return exp.id == EZAB.cData[campaignIds[i]];
			})[0].code();
		}
	}
};

EZAB.beaconRequest = function(cid, eid, event){
  var img = new Image();
  img.src = EZAB.BEACON_URL + "?cid=" + cid + "&eid=" + eid + "&event=" + event;
};

EZAB.init = function(){
	EZAB.cData = EZAB.getCookieData();
  EZAB.checkForCampaignStart();
  EZAB.checkForCampaignSuccess();
  EZAB.executeExperiences();
};


/*\
|*|
|*|  :: cookies.js ::
|*|
|*|  A complete cookies reader/writer framework with full unicode support.
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/document.cookie
|*|
|*|  This framework is released under the GNU Public License, version 3 or later.
|*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
|*|
|*|  Syntaxes:
|*|
|*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
|*|  * docCookies.getItem(name)
|*|  * docCookies.removeItem(name[, path], domain)
|*|  * docCookies.hasItem(name)
|*|  * docCookies.keys()
|*|
\*/

EZAB.docCookies = {
  getItem: function (sKey) {
    return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
  },
  setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
    if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) { return false; }
    var sExpires = "";
    if (vEnd) {
      switch (vEnd.constructor) {
        case Number:
          sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
          break;
        case String:
          sExpires = "; expires=" + vEnd;
          break;
        case Date:
          sExpires = "; expires=" + vEnd.toUTCString();
          break;
      }
    }
    document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
    return true;
  },
  removeItem: function (sKey, sPath, sDomain) {
    if (!sKey || !this.hasItem(sKey)) { return false; }
    document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
    return true;
  },
  hasItem: function (sKey) {
    return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
  },
  keys: function () {
    var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
    for (var nIdx = 0; nIdx < aKeys.length; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]); }
    return aKeys;
  }
};

document.addEventListener("DOMContentLoaded", function(event){
  EZAB.init();
})