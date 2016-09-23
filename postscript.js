// this script runs on every page, AFTER all other scripts.
// so, the layout looks like this:
// script.js: function creation, variable initializing, all stuff every page does.
// page script: page-specific code. setting clicker positions, custom scripts(?), page background, stuff like that.
// postscript.js: more stuff that happens every page, but depends on the page script.

$(document).ready(function(){



	/*inventory_add_item("It's an inventory item!","nothing.png");
	inventory_add_item("Ahaha its another one","nothing.png");
	inventory_remove_item("It's an inventory item!");*/
	print_inventory();
	if(debug){
		$('.clicker').css('background','#FFFF77');
	}
});
