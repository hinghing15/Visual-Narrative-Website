// this script runs on every page, AFTER all other scripts.
// so, the layout looks like this:
// script.js: function creation, variable initializing, all stuff every page does.
// page script: page-specific code. setting clicker positions, custom scripts(?), page background, stuff like that.
// postscript.js: more stuff that happens every page, but depends on the page script.

$(document).ready(function(){

	//musics
	var loopingmusic = new Sound('sounds/BackgroundMusicAmbience.mp3');
	loopingmusic.setVolume(0.3);
	// loopingmusic.setRate(1);
	
	//commented out to mute during development. uncomment to have playing ambience.
	loopingmusic.playLooping();

	if(sessionStorage.beingChased == null){
		sessionStorage.beingChased = 0;
		console.log('initializing beingChased');
	}

	if(sessionStorage.beingChased == 1){
		background_set("#331010");
		setInterval(function(){
			$('#wrapper').css({
				'margin-top': -202+(2-4*Math.random()),
				'margin-left': -360+(2-4*Math.random())
			});
			loopingmusic.setVolume(0.5);
			loopingmusic.setRate(3);
		}, 30);
	} else if(sessionStorage.beingChased == 2){
		$('#wrapper').css({
			'transform':'scale(1.25, 1.25)'
		});
		var alphabet = '123-456-789-###';
		setInterval(function(){
			background_set("#ff0000");
			$('#wrapper').css({
				'margin-top': -202+(5-10*Math.random()),
				'margin-left': -360+(5-10*Math.random())
			});
			var randomString = '';
		    for (var i = 0; i < 20; i++) {
		    	var randomPoz = Math.floor(Math.random() * alphabet.length);
		    	randomString += alphabet.substring(randomPoz,randomPoz+1);
		    }
		    document.title = randomString;
		    loopingmusic.setVolume(1);
			loopingmusic.setRate(4);
		}, 30);
	}


	/*inventory_add_item("It's an inventory item!","nothing.png");
	inventory_add_item("Ahaha its another one","nothing.png");
	inventory_remove_item("It's an inventory item!");*/
	print_inventory();
	if(debug){
		$('.clicker').css('border-bottom','1px dashed red');
		$('.clicker').css('border-right','1px dashed red');

		$('.inline-clicker').css('border-bottom','1px dashed green');
		$('.inline-clicker').css('border-right','1px dashed green');

		var togglebutt = document.createElement('button');
		$(togglebutt).html('toggle chase');
		$(togglebutt).css({
			'position': 'absolute',
			'display': 'block',
			'top':'0px',
			'left':'0px'
		});
		document.body.appendChild(togglebutt);
		$(togglebutt).click(function(){
			if (sessionStorage.beingChased == 2){
				sessionStorage.beingChased = 0;
			} else {
				sessionStorage.beingChased++;
			}
			location.reload();
		});
	}
});

