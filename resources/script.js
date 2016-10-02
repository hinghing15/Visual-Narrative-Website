//=============================================================

var picture_url = "";
var inv = [];
//set this variable to false to turn off all the debug stuff (clicker colors, inventory printout)
var debug = true;

//=============================================================

/* function add_clicker_link(x, y, width, height, href){
	var clicker = $("<div class='clicker' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px;' onclick=\"location.href='"+href+"'\"></div>");
	$('#clickers').append(clicker);
} */

/* function add_clicker_js(x, y, width, height, js){
	var clicker = $("<div class='clicker' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px;'></div>");
	clicker.click(js);
	$('#clickers').append(clicker);
} */

function add_clicker(x, y, width, height, id, picture_src, js){
	var clicker = $("<div class='clicker' id='"+id+"' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px; background-image:url("+picture_src+");'></div>");
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
	$('#picture').css("background","url("+picture_url+")");
}

function background_set(color){
	$('body').css("background", color);
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

function Sound(src){
	this.Sound = document.createElement("audio");
	this.Sound.src = src;
	this.Sound.setAttribute("preload", "auto");
	this.Sound.setAttribute("controls", "none");
	this.Sound.style.display = "none";
	document.body.appendChild(this.Sound);

	this.play = function(){
		this.Sound.loop = false;
		this.Sound.play();
	}

	this.playLooping = function(){
		this.Sound.loop = true;
		this.Sound.play();
	}

	this.pause = function(){
		this.Sound.pause();
	}

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
	$("#clickers").css("visibility", "hidden");
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

	$("#clickers").css("visibility", "visible");
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

$(document).ready(function(){
	if (sessionStorage.inventory){
		inv = JSON.parse(sessionStorage.inventory);
	} else {
		sessionStorage.inventory = JSON.stringify([]);
	}

});
