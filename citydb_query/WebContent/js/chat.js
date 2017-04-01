$(function(){
	$("#content").css({"opacity":"1"}).fadeIn('normal');
	$("#sendbox").focus();	
	$("#sendbox").keydown(function(e){
		if(e.keyCode == 13) {
			sendmsg();
		}
	});
	$("#sendbtn").click(function(){
		sendmsg();
	});
});




function sendmsg()
{
	var msg = $("#sendbox").val();
	
	if(msg.length == 0)
	{
		alert("message empty");
		return;
	}
	$.ajax({
	     type: "post",
	     url: 'chat.do',
	     data: "do=sendmsg&msg="+msg+"&color="+$("#colorselect").val(),
	     success: function(data){
	    	 var value = jQuery.parseJSON(data);
	    	 var username	 = value["username"];
	 			var color 			 = value["color"];
	 			var time 			 = value["time"];
	 			var msg 			 = value["msg"];
	 			
	 			addmsg(username, time, color, msg);
	 			getMsg(msg);
	     },
	     error: function(){
	      alert("error");
	     }
	    });
    $("#sendbox").val("");
	$("#sendbox").focus();
	
	
}


function getMsg(msg)
{	
	if(msg==null)
		return;
	 $.ajax({
	     type: "post",
	     url: "chat.do",
	     data: "do=getmsg&msg="+msg+"&color="+$("#colorselect").val(),
	     success: function(data){
		 var value = jQuery.parseJSON(data);

		 			var username	 = value["username"];
		 			var color 			 = value["color"];
		 			var time 			 = value["time"];
		 			var msg 			 = value["msg"];
		 			var seq = value["seq"];
					var serve_user = value["serve_user"]
		 			addmsg2(username, time, color, msg, serve_user, seq);
	     },
	     error: function(){
	      alert("error");
	     }
	    });
}


function addmsg(nick, time, color, msg){
	var html = '<p class="m">'
		+'<span class="nick">'+nick+'</span>&nbsp;&nbsp;<span class="time">'+time+'</span><br />'
		+'<span class="msg" style="color:'+color+'">&nbsp;&nbsp;&nbsp;&nbsp;'+msg+'</span>'
		+'</p>';
	$("#message").append(html);
}

function addmsg2(nick, time, color, msg, serve_user, seq){
	var html = '<p class="m">'
		+'<span class="nick">'+nick+'</span>&nbsp;&nbsp;<span class="time">'+time+'</span><br />'
		+'<span class="msg" style="color:'+color+'">&nbsp;&nbsp;&nbsp;&nbsp;'+msg+'</span>'
		+'</p>'+ '<audio controls="" name="media" width="300" height="50"><source src="' + seq +'" type="audio/x-wav"></audio>';
	$("#message").append(html);
}

window.onbeforeunload=function()
{
	$("title").html("zzz");
	if(document.all)
	{
		if(event.clientY<0)
		{
			$("title").html("xxxxxx");
			return "刷新后将退出聊天室？";
		}
	}else{
		$("title").html("yyy");
		return "刷新后将退出聊天室？";
	}
}

window.onunload=function(){
	$.get($("#exit").attr("href"), function(result){});
}
