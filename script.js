

			function add_clicker(x, y, width, height, href){
				var clicker = $("<div class='clicker' style='top:"+y+"px; left:"+x+"px; width:"+width+"px; height:"+height+"px;' onclick=\"location.href='"+href+".html'\"></div>");
				$('#clickers').append(clicker);
			}

			//=============================================================

			var picture_url = "";

			//=============================================================