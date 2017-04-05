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

function query_db(res, req) {
  var data = [];

  query = "select distinct NAME from college order by NAME";
  connection.query(query,function(err, rows, fields) {
    for(i = 0; i < rows.length; i++) {
      var row = rows[i]['NAME'];
      data.push(row);
    }

    if (err) console.log(err);
    else {
      res.render('closest.jade',
             {title: "Closest Companies Around Your College ",
              results: data}
    );
    }
  });
}

exports.do_work = function(req, res) {
  query_db(res, req);
};











// exports.do_work = function(req, res){

// 	query_city(req, res);

// };


// function query_city(req, res){

//     var i = 0;
    
//     var myData = [];

//     var centerCollege = "UNIVERSITY OF PENNSYLVANIA";

//     var centerloc = ;


//     query = "select LATITUDE, LONGITUDE from college where NAME="UNIVERSITY OF PENNSYLVANIA";"
//     connection.query(query, function(err, rows, fields) {
//       if (err) console.log(err);
//       else {
//         centerloc = {rows[0]['LATITUDE'], rows[0]['LONGITUDE'] };
//       }
//     });



//     query = "SELECT C.Name, C.latitude, C.longitude FROM company C, college U WHERE U.NAME = "UNIVERSITY OF PENNSYLVANIA" ORDER BY POWER((C.latitude - U.LATITUDE), 2) + POWER((C.longitude - U.LONGITUDE), 2) LIMIT 20;";
//     //query = "select distinct city.local_name, city.geo_lat, city.geo_lng from (select distinct(City) from company) f join city on city.local_name = f.City";
//         connection.query(query, function(err, rows, fields) {
//                 if (err) console.log(err);
//                 else {
//                         //output_persons(res, login, rows);

// 			              for(i = 0; i<rows.length; i++) {
// 				            //console.log(rows[i]);
//                     var v1 = rows[i]['latitude'];
// 				            var v2 = rows[i]['longitude'];
// 			            	if(v1 < 49 && v1 > 25 && v2 < -70 && v2 > -130) {
// 				          	var data = {lat: v1, lng: v2};
// 				           	myData.push(data);
// 			        	    }   
//     			          }

// 			          res.render('closest.jade', {
// 			              title: 'map',
// 			              results: myData
//                     center: centerCollege });
//                 }
//         });
