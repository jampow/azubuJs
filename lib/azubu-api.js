var azubuApi = (function(){
	'use strict'

	var apiActions = {


		liveStreams: function() {
			return {
				method: "GET",
				url: "/public/channel/live/list",
				dataType: "json"
			}
		},

		userActiveVideo: function(opt) {
			var opt = opt || {};

			if (opt.hasOwnProperty('username')) {
				opt.username = opt.username.toLowerCase();
			}

			return {
				method: "GET",
				url: "/public/video/list",
				dataType: "json",
				data: {
					"orderBy": JSON.stringify({ "video.createdAt": "desc" }),
					"features": JSON.stringify({ 
						"lowereq": { "user.username": opt.username },
						"eq": {
							"video.type": "STREAM",
							"video.status": "ACTIVE"
						}
					}),
					"limit": "20"
				}
			}
		}
	};

	var setDefault = function(config) {
		console.log('opa');	
		return config;
	};

	var req = function(action, opt) {
		var host = "http://api.azubu.tv";

		var config = apiActions[action](opt);
		config.url = host.concat(config.url);

		$.ajax(config).done(function(data){
			if (typeof opt !== 'undefined' && opt.hasOwnProperty('callback')) {
				opt.callback.call(this, data);
			}
		});

	};

	var expose = {
		listLiveStream: function(callback) {
			return req('liveStreams', {callback: callback});
		},
		userLiveNow: function(username, callback) {
			return req('userActiveVideo', {username: username, callback: callback});
		}
	};

	/** Test-begins **/
	/* 
	 *	Expose the private methods to the unit tests
	 *	This will be removed on the final build
	 */
	
	expose.setDefault = setDefault;
	expose.apiActions = apiActions;
	expose.req = req;
	
	/** Test-ends **/
	
	return expose;
})();
