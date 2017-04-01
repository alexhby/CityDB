<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import ="java.util.*" %>
<%  
        String strURL = request.getParameter("first");  
        String strRequest = (String)request.getAttribute("strRequest");  
        String strSession = (String)request.getSession().getAttribute("strSession");
		Vector<String> list = (Vector<String>) request.getAttribute("list");
                %>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>Insert title here</title>
<!-- <script type="text/javascript" src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>-->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=6u4cyw14Ixozw4Nv3QqW4A8GomSbMatO"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction_min.js"></script>

<script>


</script>
</head>
<body>  

		<select id="div1">
		</select>
        
        <input id="condition">
		<input type="button" id="search" value="Filter">
        <script language='javascript'>
		
		var i = 0;
		
		var size = <%=list.size()%>;
		
		var colArray = new Array(size);
		
		<% for (int i=0; i<list.size(); i++) { %>
		colArray[<%= i %>] = "<%= list.get(i) %>"; 
		<% } %>
		
		
		for(i = 0; i < size; i++)
			{
			
			 daySelect = document.getElementById('div1');
			 daySelect.options[daySelect.options.length] = new Option(colArray[i], colArray[i]);
			
			 //var para = document.createElement("option");
			 
			 
			 //var p1 = colArray[i];
			   /// var node = document.createTextNode(p1);
			    //para.appendChild(node);
			    //var element = document.getElementById("div1");
			    //element.appendChild(para);
			}// this is Javascript, built when the page is generated
		    // and run when the page us displayed by the browser		   
		
		</script>
        <script>
		$(function(){
				$("#search").click(function(){
					if($("#condition").val() && $("#condition").val()!=''){
						var allOptions = $("#div1").children();
						alert(allOptions);
						$(allOptions).each(function(i){
							if($(allOptions[i]).html().indexOf($("#condition").val()) <= -1){
								$("#div1").append(allOptions[i]);
								$("#div1 option").eq(0).attr('selected', 'true');
							}
						});
						
					}
				});
			});
		
		</script>
        <a href="/citydb_query/map.do">map</a>
    </body>  

</html>
