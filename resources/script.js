//=============================================================

var picture_url = "";
var inv = [];

var tremolo = null;

//set this variable to false to turn off all the debug stuff (clicker colors, inventory printout)
var debug = true;


//=============================================================


function add_clicker(x, y, width, height, id, picture_src, js){
	var clicker = $("<div class='clicker' id='"+id+"' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px; background-image:url("+picture_src+"); background-size:contain;'></div>");
	clicker.click(js);
	$('#clickers').append(clicker);
}

function remove_clicker(id){
	if($("#"+id).hasClass("clicker")){
		$("#"+id).remove();
	}
}

function print_inventory() {
	if(debug){
		$('#debug-inv').remove();
		$(document.body).append("<pre id='debug-inv'></pre>");
		for(var i = 0; i < inv.length; i++){
			$('#debug-inv').append("["+inv[i][0]+", "+inv[i][1]+"]\n");
		}
	}
	$("#inventory").empty();
	for(var j = 0; j < inv.length; j++){
		$("#inventory").append("<div class='item'><img src='"+inv[j][1]+"' /><div class='tooltip'>"+inv[j][0]+"</div></div>");
	}

	$(".item").mousemove(function(e){
		console.log('moved');
		var x = e.clientX-$(e.currentTarget).offset().left+0;
		var y = e.clientY-$(e.currentTarget).offset().top+35;
		$('.tooltip').css('left',x+'px');
		$('.tooltip').css('top',y+'px');

	});
}

function inventory_has_item(name){
	var i = inv.findIndex(function(arg) { return arg[0] == name;});
	if (i >= 0){
		console.log('you had the '+name);
		console.log(i);
		return true;
	} else {
		console.log('you didnt have the '+name);
		console.log(i);
		return false;
	}
}

function inventory_add_item(name, img_src){
	if(!inventory_has_item(name)){
		var i = inv.findIndex(function(arg) { return arg[0] == name;});
		inv.push([name,img_src]);
		sessionStorage.inventory = JSON.stringify(inv);
		print_inventory();
	} else {
		console.log(name+' already in inventory! Not added.');
	}
}

function inventory_remove_item(name){
	var i = inv.findIndex(function(arg) { return arg[0] == name;});
	inv.splice(i, 1);
	sessionStorage.inventory = JSON.stringify(inv);
	print_inventory();
}

function inventory_clear(){
	inv = [];
	sessionStorage.inventory = JASON.stringivy(inv);
	print_inventory();
}

function subtitle_set(message){

	$('#subtitle').text(message);
}

function picture_set(url){
	picture_url=url;
	$('#picture').css({
		"background":"url("+picture_url+")",
		"background-size":"contain"
	});
}

function background_set(color){


	$('body').css("background", color);	
}

function border_set(color){


	$('#wrapper').css("border","1px solid "+color);
}

function nav_make(which,link){
	//0 1 2 3
	var wew = ['click-up','click-right','click-down','click-left'];
	if(link != ""){
		$("#"+wew[which]).click(function(){
			location.href = link;
		});
	} else {
		$("#"+wew[which]).remove();
	}
}

function nav_left(link){

	nav_make(3,link);
}

function nav_right(link){

	nav_make(1,link);
}

function nav_up(link){

	nav_make(0,link);
}

function nav_down(link){

	nav_make(2,link);
}

function Sound(src, options){
	this.Sound = new Audio();
	this.Sound.src = src;
	this.Sound.setAttribute("preload", "auto");
	this.Sound.setAttribute("controls", "none");
	this.Sound.style.display = "none";
	if(options)
		$('#inline-clickers').append(this.Sound);
		//options[0].appendChild(this.Sound);
	else
		document.body.appendChild(this.Sound);


	this.play = function(){
		this.Sound.loop = false;
		this.Sound.play();
	}
	
	this.addEventListener = function(name, func)
	{
		this.Sound.addEventListener(name,func);
	}

	this.playLooping = function(){
		this.Sound.addEventListener('loadedmetadata', function() {
			console.log(this.duration);
			this.currentTime = Math.random() * this.duration;
			this.play();
			this.loop = true;
			return;
		});
		this.currentTime = Math.random() * this.duration;
		this.play();
		this.Sound.loop = true;
	}

	this.pause = function(){
		this.Sound.pause();
	}

	this.currentTime = function(time)
	{
		this.Sound.currentTime = time;
	}
	
	this.setVolume = function(vol){
		this.Sound.volume = vol;
	}

	this.setRate = function(rate){
		this.Sound.playbackRate = rate;
	}
}

function stop_all_sounds(){ // right off of stackoverflow baby
	var sounds = document.getElementsByTagName('audio');
 	for(i=0; i<sounds.length; i++) sounds[i].pause();
}


// inline view functions?????

function show_inline_view(picture_src, on_load){
	var bgimg = new Image();
	//var inl = $("#inline");
	bgimg.onload = function(){
		//console.log("image LOADED: " + this.width + " x " + this.height);
		$("#inline").css("background-image", "url("+this.src+")");
		$("#inline").css("width", this.width+"px");
		$("#inline").css("height", this.height+"px");
		if(this.height < 405){
			$("#inline").css("bottom", "50%");
			var halverh = this.height/2;
			$("#inline").css("margin-bottom", "-"+halverh+"px");
		} else {
			$("#inline").css("bottom", "0px");
			$("#inline").css("margin-bottom", "0px");
		}
		var halverw = this.width/2;
		$("#inline").css("margin-left","-"+halverw+"px");
	};
	bgimg.src = picture_src;
	on_load();
	//console.log("inline SHOWED.");
	$("#inline").css("visibility", "visible");
	$("#clickers").css("pointer-events", "none");
	$("#navclicks").css("visibility", "hidden");
	$(".inline-dismisser").css("visibility", "visible");


	$(".inline-dismisser").click(function(){
		hide_inline_view();
	});
}


function hide_inline_view(){
	//console.log("inline HID.");
	$("#inline").css("visibility", "hidden");
	$("#inline-clickers").empty();

	$("#clickers").css("pointer-events", "all");
	$("#navclicks").css("visibility", "visible");
	$(".inline-dismisser").css("visibility", "hidden");
}


function add_inline_clicker(x, y, width, height, id, picture_src, js){
	var clicker = $("<div class='inline-clicker' id='"+id+"' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px; background-image:url("+picture_src+");'></div>");
	
	clicker.click(js);
	$('#inline-clickers').append(clicker);
	console.log("inline clicker ADDED.");
}

function remove_inline_clicker(id){
	if($("#"+id).hasClass("inline-clicker")){
		$("#"+id).remove();
	}
}

function add_inline_text_form(x, y, width, height, id, name, js, func){
	var clicker = $("<div id='wrapper' style='text-align:center;'><div class='inline-text' id='"+id+"' style='width:"+width+"px; height:"+height+"px; margin-left:"+x+"px; margin-top:"+y+"px'><input type='text' maxlength=10 rows=1 placeholder='Password' id='hiddeninput' name='hiddeninput' /></div></div>");
	//var clicker = $("<div class='inline-text' name='" + name + "'id='"+id+"' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px;'></div><input type='text' name='textBox' placeholder='Password' /><input type='submit' name='button' id='button1' onclick='" + func + "' value='=' />");
	//var clicker = $("<div class='inline-text' name='" + name + "'id='"+id+"' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px;'></div><input type='text' name='textBox' placeholder='Password' /><input type='submit' name='button' id='button1' onclick='" + func + "' value='=' />");
	clicker.click(js);
	$('#inline-clickers').append(clicker);
	console.log("inline text ADDED.");
}

function remove_inline_text(id){
	if($("#"+id).hasClass("inline-text")){
		$("#"+id).remove();
	}
}

function clear_all_intervals() {
    for (var i = 1; i < 99999; i++)
        window.clearInterval(i);
    // blatantly stolen off stackoverflow
}

function style_for_chase(chasenum){
	if(chasenum == 0){
		background_set("#101010");
		//clear_all_intervals();
		document.title = "\u200E";
		$('#wrapper').css({
			'transform':'none'
		});
	} else if(chasenum == 1){
		window.clearInterval(tremolo);
		background_set("#331010");
		$('#wrapper').css({
			'transform':'none'
		});
		//loopingmusic.setVolume(0.5);
		//loopingmusic.setRate(3);

		tremolo = setInterval(function(){
			$('#wrapper').css({
				'margin-top': -202+(2-2*2*Math.random()),
				'margin-left': -360+(2-2*2*Math.random())
			});
			
		}, 30);
	} else if(chasenum == 2){
		window.clearInterval(tremolo);
		background_set("#ff0000");
		$('#wrapper').css({
			'transform':'scale(1.25, 1.25)'
		});
		var alphabet = '123-456-789-###';
		//loopingmusic.setVolume(1);
		//loopingmusic.setRate(4);
		tremolo = setInterval(function(){
			$('#wrapper').css({
				'margin-top': -202+(5-5*2*Math.random()),
				'margin-left': -360+(5-5*2*Math.random())
			});
			var randomString = '';
		    for (var i = 0; i < 20; i++) {
		    	var randomPoz = Math.floor(Math.random() * alphabet.length);
		    	randomString += alphabet.substring(randomPoz,randomPoz+1);
		    }
		    document.title = randomString;
		}, 30);
	}
}

function lose(deathString){ //lose the game on the spot.
	//style_for_chase(2);
	var screamSound = new Sound('sounds/Scream.mp3');
	screamSound.play();
	background_set('#ff0000');
	sessionStorage.dead = "1"; //you're dead now.
	tremble = 40;
	subtitle_set("");
	var w = $(window).width()+tremble*2;
	var h = w * (600/1280);
	var jumpscare = document.createElement('div');
	$(jumpscare).css({
		'position': "fixed",
		'id': 'jumpscare', 
		'left': '50%', 
		'top': '50%', 
		'background-image': 'url(clickers/JUMPSCARE.png)',
		'background-size': '100%',
		'width': w+'px',
		'height': h+'px',
		'margin-left': (-w/2)+'px',
		'margin-top': (-h/2)+'px',
	});
	document.body.appendChild(jumpscare);
	setInterval(function(){
			var w = $(window).width()+tremble*2;
			var h = w * (600/1280);
			$('#wrapper').css({
				'margin-top': -202+(tremble-tremble*2*Math.random()),
				'margin-left': -360+(tremble-tremble*2*Math.random())
			});
			$(jumpscare).css({
				'margin-top': -(h/2)+(tremble-tremble*2*Math.random()),
				'margin-left': -(w/2)+(tremble-tremble*2*Math.random())
			});
		}, 30);
	setTimeout(function(){
		stop_all_sounds();
		clear_all_intervals();
		$('#wrapper').remove();
		$(jumpscare).remove();
		var blep = document.createElement('div');
		$(blep).css({
			'position': "fixed",
			'id': 'blep', 
			'left': '50%', 
			'top': '50%', 
			'transform': 'translate(-50%, -50%)',
			'color':'white',
			'text-align': 'center'
		});
		$(blep).html("<p>"+deathString+"</p><p>&nbsp;</p>");
		background_set('#101010');
		document.body.appendChild(blep);
		setTimeout(function(){
			$(blep).html("<p>"+deathString+"</p><p><a>Play Again?</a></p>");
			$('a').click(function(){
				sessionStorage.clear();
				location.href = 'index.html';
			})
		}, 1000);
	}, 1000);
}

$(document).ready(function(){
	if (sessionStorage.inventory){
		inv = JSON.parse(sessionStorage.inventory);
	} else {
		sessionStorage.inventory = JSON.stringify([]);
	}
});
