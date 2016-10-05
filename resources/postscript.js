// this script runs on every page, AFTER all other scripts.
// so, the layout looks like this:
// script.js: function creation, variable initializing, all stuff every page does.
// page script: page-specific code. setting clicker positions, custom scripts(?), page background, stuff like that.
// postscript.js: more stuff that happens every page, but depends on the page script.

$(document).ready(function(){


	var loopingmusic = new Sound('sounds/BackgroundMusicAmbience.mp3');
	var loopingviolins = new Sound('sounds/ScaryViolins.mp3');
	loopingmusic.setVolume(0.3);
	loopingviolins.setVolume(0.1);
	

	if(sessionStorage.beingChased == null){
		sessionStorage.beingChased = 0;
		console.log('initializing beingChased');
	}
	if(!$('#girl').length){ //bit of a hack to check if we aren't in the basement becaues sound is different there.
		if (sessionStorage.beingChased == 0){
			loopingmusic.playLooping();
		} else if(sessionStorage.beingChased == 1){
			style_for_chase(1);
			loopingviolins.setVolume(0.5);
			loopingviolins.setRate(1.5);
			loopingmusic.pause();
			loopingviolins.playLooping();
			setTimeout(function(){
				style_for_chase(2);
			},1000*2);
			setTimeout(function(){
				lose("You were caught.");
			}, 1000*4);
		} else if (sessionStorage.beingChased == 2){
			style_for_chase(2);
			loopingviolins.setVolume(1);
			loopingviolins.setRate(4);
			loopingmusic.pause();
			loopingviolins.playLooping();
		}
	} else {
		console.log('in the basement');
	}
	//init_chase(sessionStorage.beingChased);

	if(sessionStorage.dead == "1"){
		console.log("YOU'RE ALREADY DEAD.");
		$("#wrapper").css('pointer-events','none');
		setTimeout(function(){lose("No going back.");}, 3000);
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

	/*	var togglebutt = document.createElement('button');
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
			
			init_chase(sessionStorage.beingChased);
		});

	*/

		var losebutt = document.createElement('button');
		$(losebutt).html('Die');
		$(losebutt).css({
			'position': 'absolute',
			'display': 'block',
			'top':'40px',
			'left':'0px'
		});
		document.body.appendChild(losebutt);
		$(losebutt).click(function(){
			lose("You died.");
		});
	}
});

