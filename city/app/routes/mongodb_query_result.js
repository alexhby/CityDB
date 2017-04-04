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


var MongoClient = require('mongodb').MongoClient;

// Connect to the db
/*MongoClient.connect("mongodb://citydb:citydb1234@ds129469.mlab.com:29469/citydb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }

  var collection = db.collection('citydb');

  collection.find({"name":"The_Mentoring_Partnership_of_Southwestern_Pennsylvania"}).toArray(function (err, result) {
      if (err) {
        console.log(err);
      } else if (result.length) {
        console.log('Found:', result);
      } else {
        console.log('No document(s) found with defined "find" criteria!');
      }
      //Close connection
      db.close();
    });

  
});
*/

var myData = [];
var infos = [];

exports.do_work = function(req, res){

	console.log(req.query.text);

	MongoClient.connect("mongodb://citydb:citydb1234@ds129469.mlab.com:29469/citydb", function(err, db) {
	  if(!err) {
	    console.log("We are connected");
  	}	

	var collection = db.collection('user');


	collection.createIndex( { type: 1 } );

	collection.find( { type: req.query.text},{_id: 0, name:1, introduction:1} ).toArray(function(err, items) {

	if(items.length > 0)
	{
		
	var myMap = new Map();
	
	query = "select Name, latitude, longitude from company where ";	
		for(var i = 0; i<items.length; i++)
		{
			var company_name = items[i]['name']; 
			myMap.set(company_name, items[i]['introduction']);
			    var locations;
			if(i == 0)
			{
				query = query + "Name = '" + company_name + "'";
			}
			else
			{
				query = query + " or Name = '" + company_name + "'";
			}


		}

			    connection.query(query, function(err, rows, fields) {
                		if (err) console.log(err);
                		else {
                        		for(var j = 0; j < rows.length; j++)
                        		{
                                		var v1 = rows[j]['latitude'];
						var v2 = rows[j]['longitude'];
						var intro = myMap.get(rows[j]['Name']);
						var locations = {lat: v1, lng:v2};
                                		myData.push(locations);
						infos.push(intro);
                        		}
					res.render('mongodb_query_result.jade', {title: 'map', results: myData, infos: infos});
                		}
        		});

	}

	else
		res.render('mongodb_query_result.jade', {title: 'map', results: myData});
			//query_city(company_name, myData);
			//console.log(myData);
		
      	//Close connection
        	db.close();
	        });

		

	});


      	/*if (err) {
        	console.log(err);
      	} else if (result.length) {
        	console.log('Found:', result);
      	} else {
        	console.log('No document(s) found with defined "find" criteria!');
      	}*/
      //Close connection
    //  	db.close();
  //  	});


//	});


	//query_city(req, res);

};


function query_city(company_name, myData){

    var i = 0;
    

    var locations;


    query = "select latitude, longitude from company where Name = '" + company_name + "'";


        connection.query(query, function(err, rows, fields) {
                if (err) console.log(err);
                else {
                        //output_persons(res, login, rows);

			if(rows.length >= 1)
			{
				locations = rows[0];
				myData.push(locations);
//				console.log(myData);
			}
			//for(i = 0; i<rows.length; i++)
    			//{
				//console.log(rows[i]);
                        //        var v1 = rows[i]['geo_lat'];
			//	var v2 = rows[i]['geo_lng'];
			//	if(v1 < 49 && v1 > 25 && v2 < -70 && v2 > -130)
                          //      {
			//		var data = {lat: v1, lng: v2};
			//		myData.push(data);
			//	}
    			//}

			    //res.render('index_map.jade', {
			      //    title: 'map',
			        //  results: myData
			//	});

			
                }
        });

   return locations;
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


module.exports.query_city = query_city;

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
