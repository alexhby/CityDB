//var express = require("express");
//var app = express();
//var geohash = require("geohash").GeoHash;
 
// route routing is very easy with express, this will handle the request for root directory contents.
// :id is used here to pattern match with the first value after the forward slash.
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'aws-us-east-1-portal.26.dblayer.com',
  port     : '17934',
  user     : 'admin',
  password : 'citydb1234',
  database : 'citydb'
});

exports.do_work = function(req, res){
//	query(req, res);
//  res.render('NY_map.jade');
	query_city(req, res);

};


function query_city(req, res){

    var i = 0;
    
    var myData = [];

    var infos = [];


    query = "select distinct city.local_name, city.geo_lat, city.geo_lng from (select distinct(City) from company) f join city on city.local_name = f.City";
        connection.query(query, function(err, rows, fields) {
                if (err) console.log(err);
                else {
                        //output_persons(res, login, rows);

			for(i = 0; i<rows.length; i++)
    			{
				//console.log(rows[i]);
                                var v1 = rows[i]['geo_lat'];
				var v2 = rows[i]['geo_lng'];
                                var v3 = rows[i]['local_name'];
				if(v1 < 49 && v1 > 25 && v2 < -70 && v2 > -130)
                                {
					var data = {lat: v1, lng: v2};
                                        var info = v3;
					myData.push(data);
                                        infos.push(info);
					console.log(rows[i]['local_name']);
				}
    			}

			    res.render('NY_map.jade', {
			          title: 'map',
			          results: myData,
                                  infos: infos
				});

			
                }
        });

//    var d1 = {lat : 41.08770000000, lng:  -73.77680000000};
//    var d2 = {lat:  40.44950000000, lng: -79.98800000000};

 //   myData.push(d1);
 //   myData.push(d2);

   /* for(i = -10; i<10; i++)
    {
        var data = {lat : i, lng: i}; 
	
	myData.push(data);
    }

    res.render('map.jade', {
          title: 'map',
          results: myData
*/
}




//app.get("/",function (req,res)
//    {
                //decode the geohash with geohash module
//        var latlon = geohash.decodeGeoHash(req.params["id"]);
//        console.log("latlon : " + latlon);
 //       var lat = latlon.latitude[2];
//        console.log("lat : " + lat);
//        var lon = latlon.longitude[2];
//        console.log("lon : " + lon);
//        zoom = req.params["id"].length + 2;
//        console.log("zoom : " + zoom);
                // now we use the templating capabilities of express and call our template to render the view, and pass a few parameters to it
//        res.render("index.ejs", { layout: false, lat:lat, lon:lon, zoom:zoom, geohash:req.params["id"]});

//	res.sendFile(__dirname + "/" + "map.jade");
//	res.render("map.jade");
//    })
 
//app.listen(9999);
