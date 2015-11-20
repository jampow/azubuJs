var jsdom = require('mocha-jsdom');

describe('method apiActions', function(){
	var $;
	jsdom()

	before(function(){
		$ = require('jquery');
	});

	it('works',function(done){
		this.timeout(20000);
		$.ajax({
			url:'http://api.azubu.tv/public/channel/live/list',
			method: 'GET',
			dataType: 'json'
		}).done(function(data){
			console.log(data);
			done();
		});
	});
});
