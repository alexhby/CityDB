<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<title>Insert title here</title>
<!-- <script type="text/javascript" src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>-->
<script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=6u4cyw14Ixozw4Nv3QqW4A8GomSbMatO"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction_min.js"></script>
</head>
<body>
<form action="choose.do" method="post">
<label>请选择您的目的地：<br>
<input id = "inp" type="text" name="location"/> </label>
<input type="submit" name="submit" value="yes" />
</form>
<div style="width:697px;height:550px;border=#ccc solid 1px;" id="dituContent"></div>
</body>

<script type="text/javascript">
	function initMap(){
		createMap();
		setMapEvent();
		addMapControl();

	}
	
	function createMap(){
		var map = new BMap.Map("dituContent",{minZoom:17,maxZoom:18});//在百度地图容器中创建一个地图

        var point = new BMap.Point(116.326952,40.006704);//定义一个中心点坐标

        map.centerAndZoom(point,17);//设定地图的中心点和坐标并将地图显示在地图容器中
        
        
        var b =new BMap.Bounds(new BMap.Point(116.318984,40.001889),new BMap.Point(116.344208,40.019953));
        try{
        	BMapLib.AreaRestriction.setBounds(map, b);
        } catch(e){
        	alert(e);
        }
        
       	var geolocation = new BMap.Geolocation();
	geolocation.getCurrentPosition(function(r){
		if(this.getStatus() == BMAP_STATUS_SUCCESS){
			var myIcon = new BMap.Icon("http://developer.baidu.com/map/jsdemo/img/fox.gif", new BMap.Size(300,157));
			var mk = new BMap.Marker(r.point,{icon: myIcon});
			map.addOverlay(mk);
			map.panTo(r.point);
			alert('您的位置：'+r.point.lng+','+r.point.lat);
		}
		else{
			alert('failed'+this.getStatus());
		}
	},{enableHighAccuracy: true})
	


        var marker1 = new BMap.Marker(new BMap.Point(116.331075,40.009481));
		map.addOverlay(marker1);
		marker1.addEventListener("click",attribute1);
		
        var marker2 = new BMap.Marker(new BMap.Point(116.329593, 40.008929));
		map.addOverlay(marker2);
		marker2.addEventListener("click",attribute2);
		
        var marker3 = new BMap.Marker(new BMap.Point(116.331659, 40.008037));
		map.addOverlay(marker3);
		marker3.addEventListener("click",attribute3);
		
        var marker4 = new BMap.Marker(new BMap.Point(116.329629, 40.008473));
		map.addOverlay(marker4);
		marker4.addEventListener("click",attribute4);
		
        var marker5 = new BMap.Marker(new BMap.Point(116.327634, 40.010511));
		map.addOverlay(marker5);
		marker5.addEventListener("click",attribute5);
		
		var marker6 = new BMap.Marker(new BMap.Point(116.331614, 40.010441));
		map.addOverlay(marker6);
		marker6.addEventListener("click",attribute6);
		
		var marker7 = new BMap.Marker(new BMap.Point(116.334668, 40.009896));
		map.addOverlay(marker7);
		marker7.addEventListener("click",attribute7);
		
		var marker8 = new BMap.Marker(new BMap.Point(116.331039, 40.006953));
		map.addOverlay(marker8);
		marker8.addEventListener("click",attribute8);
		
		var marker9 = new BMap.Marker(new BMap.Point(116.331836, 40.007464));
		map.addOverlay(marker9);
		marker9.addEventListener("click",attribute9);
		
		var marker10 = new BMap.Marker(new BMap.Point(116.330365, 40.009108));
		map.addOverlay(marker10);
		marker10.addEventListener("click",attribute10);
		
		var marker11 = new BMap.Marker(new BMap.Point(116.335908, 40.007063));
		map.addOverlay(marker11);
		marker11.addEventListener("click",attribute11);
		
		var marker12 = new BMap.Marker(new BMap.Point(116.339016, 40.011415));
		map.addOverlay(marker12);
		marker12.addEventListener("click",attribute12);
		
		var marker13 = new BMap.Marker(new BMap.Point(116.331201, 40.00783));
		map.addOverlay(marker13);
		marker13.addEventListener("click",attribute13);
        
        
        window.map = map;//将map变量存储在全局

        


	}
	
	function attribute1(e){
		document.getElementById("inp").value="大礼堂";
/*		var walking = new BMap.WalkingRoute(map, {renderOptions:{map: map, autoViewport: true}});
		var endpoint = new BMap.Point(116.33308,40.017212);
		var startpoint = new BMap.Point(r.point.lng,r.point.lat);
		walking.search(startpoint,endpoint);*/
	}

	function attribute2(e){
		document.getElementById("inp").value="水木清华";
	}

	function attribute3(e){
		document.getElementById("inp").value="清华学堂";
	}
	
	function attribute4(e){
		document.getElementById("inp").value="工字厅";
	}

	function attribute5(e){
		document.getElementById("inp").value="西区体育馆";
	}
	
	function attribute6(e){
		document.getElementById("inp").value="图书馆（老馆）";
	}
	
	function attribute7(e){
		document.getElementById("inp").value="文科图书馆";
	}
	
	function attribute8(e){
		document.getElementById("inp").value="二校门";
	}
	
	function attribute9(e){
		document.getElementById("inp").value="清华世纪鼎";
	}
	
	function attribute10(e){
		document.getElementById("inp").value="闻一多雕像";
	}
	
	function attribute11(e){
		document.getElementById("inp").value="新清华学堂";
	}
	
	function attribute12(e){
		document.getElementById("inp").value="东大操场";
	}
	
	function attribute13(e){
		document.getElementById("inp").value="日晷";
	}
    //地图事件设置函数：

    function setMapEvent(){

        map.enableDragging();//启用地图拖拽事件，默认启用(可不写)

        map.enableScrollWheelZoom();//启用地图滚轮放大缩小
        
        map.enableDoubleClickZoom();//启用鼠标双击放大，默认启用(可不写)

        map.enableKeyboard();//启用键盘上下左右键移动地图
        	
    }


    
//地图控件添加函数：

    function addMapControl(){

        //向地图中添加缩放控件

	var ctrl_nav = new
BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_ZOOM,enableGeolocation: true});
	map.addControl(ctrl_nav);

/*        //向地图中添加缩略图控件

	var ctrl_ove = new 
BMap.OverviewMapControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,isOpen:0});

	map.addControl(ctrl_ove);*/

        //向地图中添加比例尺控件

	var ctrl_sca = new BMap.ScaleControl({anchor:BMAP_ANCHOR_BOTTOM_LEFT});
	map.addControl(ctrl_sca);


/*	var geolocationControl = new BMap.GeolocationControl();
	geolocationControl.addEventListener("locationSuccess",function(e){
	
		var address = '';
		address += e.addressComponent.province;
		address += e.addressComponent.city;
		address += e.addressComponent.district;
		address += e.addressComponent.street;
		address += e.addressComponent.streetNumber;
		alert("Address is " + address);
	});
	geolocationControl.addEventListerner("locationError",function(e){
		alert(e.message);
	});
	map.addControl(geolocationControl);*/
	
}


	alert("Pick Point on The Map!");
    initMap();//创建和初始化地图

</script>

</html>
