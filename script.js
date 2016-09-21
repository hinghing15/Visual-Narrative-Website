//=============================================================

var picture_url = "";
var inv = [];
var debug = true;

//=============================================================

function add_clicker_link(x, y, width, height, href){
	var clicker = $("<div class='clicker' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px;' onclick=\"location.href='"+href+"'\"></div>");
	$('#clickers').append(clicker);
}

function add_clicker_js(x, y, width, height, js){
	var clicker = $("<div class='clicker' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px;' onclick=\"javascript:"+js+"\"></div>");
	$('#clickers').append(clicker);
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

function inventory_add_item(name, img_src){
	var i = inv.findIndex(function(arg) { return arg[0] == name;});
	inv.push([name,img_src]);
	sessionStorage.inventory = JSON.stringify(inv);
	print_inventory();
}

function inventory_remove_item(name){
	var i = inv.findIndex(function(arg) { return arg[0] == name;});
	inv.splice(i, 1);
	sessionStorage.inventory = JSON.stringify(inv);
	print_inventory();
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

function nav_make(which,link){
	//0 1 2 3
	if(link != ""){
		var wew = ['click-up','click-right','click-down','click-left'];
		$("#"+wew[which]).click(function(){
			location.href = link;
		});
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



$(document).ready(function(){
	if (sessionStorage.inventory){
		inv = JSON.parse(sessionStorage.inventory);
	} else {
		sessionStorage.inventory = JSON.stringify([]);
	}

});

