// query 4

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'aws-us-east-1-portal.26.dblayer.com',
  port     : '17934',
  user     : 'admin',
  password : 'citydb1234',
  database : 'citydb'
});

function query_correltion(res, state){

    var i = 0;
    var city_locations = [];
    var city_names = [];
    var company_nums = [];
    var college_nums = [];

    query = "SELECT TC.local_name, T3.geo_lat, T3.geo_lng, TC.c_count, TU.u_count FROM (SELECT T1.local_name, count(*) AS c_count FROM city T1, company C WHERE C.City = T1.local_name";
    if(state){
        query += " AND T1.State = '";
        query += state;
        query += "'"
    }
    
    query += " GROUP BY T1.local_name ORDER BY count(C.id) DESC LIMIT 30) TC JOIN (SELECT T2.local_name, count(*) AS u_count FROM city T2, college1 U WHERE U.CITY = T2.local_name";
    if(state){
        query += " AND U.STABBR = '";
        query += state;
        query += "'"
    }
    query += " GROUP BY T2.local_name ORDER BY count(U.ID) DESC LIMIT 30) TU ON TC.local_name = TU.local_name, city T3 WHERE TC.local_name = T3.local_name";
    if(state){
        query += " AND T3.State = '";
        query += state;
        query += "'";
    }


    connection.query(query, function(err, rows, fields) {
            if (err) console.log(err);
            else {
                for(i = 0; i<rows.length; i++) {
                    var v1 = rows[i]['geo_lat'];
    				var v2 = rows[i]['geo_lng'];
                    // filter outlier
    				if(v1 < 49 && v1 > 23 && v2 < -65 && v2 > -130){
    					var data = {lat: v1, lng: v2};
    					city_locations.push(data);
                        city_names.push(rows[i]['local_name']);
                        company_nums.push(rows[i]['c_count']);
                        college_nums.push(rows[i]['u_count']);
                    }
                }

                res.render('correlation.jade', {
                    title: 'map',
                    results: city_locations,
                    city_names: city_names,
                    company_nums: company_nums,
                    college_nums: college_nums
                });
            }
    });
}

exports.do_work = function(req, res){
    query_correltion(res, req.query.state);
};

