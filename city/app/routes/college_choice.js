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

function query_db_choice(res, logina) {
  //console.log(logina)
  query = "";
  if(logina) query = query + "select NAME, CITY, STABBR, TOT_ENROLL, GRAD_DEBT_MDN_SUPP from college where STABBR = '" + logina + "';";
  else query = query + "select distinct state from city;";

  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      output_college(res, logina, rows);
    }
  });
}

function output_college(res,logina,results) {
  //console.log(results)
  if(logina == undefined){
    res.render('college_choice.jade',
       { title: "User Input: ",
         results: results,
         flag: 0 }
    );
  }
  else{
    res.render('college_choice.jade',
       { title: "Result return: " + logina,
         results: results, 
         flag: 1 }
    );
  }
}

exports.do_work = function(req, res){
  query_db_choice(res, req.query.name);
};
