var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'aws-us-east-1-portal.26.dblayer.com',
  port     : '17934',
  user     : 'admin',
  password : 'citydb1234',
  database : 'citydb'
});

exports.do_work = function(req, res){
	query_db(res,req.query.NAME);
};

function query_db(res, NAME) {
	var data = [];
	query = "SELECT C.Name, C.latitude, C.longitude FROM company C, college U WHERE U.NAME = '" + NAME + "' ORDER BY POWER((C.latitude - U.LATITUDE), 2) + POWER((C.longitude - U.LONGITUDE), 2) LIMIT 20";
	connection.query(query, function(err, rows, fields){
		for(i = 0; i < rows.length; i++) {
		  var v1 = rows[i]['Name'];
		  var v2 = rows[i]['latitude'];
		  var v3 = rows[i]['longitude'];
          var row = {Name: v1, latitude: v2, longitude: v3};
          data.push(row);
        }

		if (err) console.log(err);
		else{
			res.render('closest_company.jade',
			           { title: "Companies inculde",
			           results: data }
			           );
		}
	});
}