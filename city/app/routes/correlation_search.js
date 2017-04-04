exports.do_work = function(req, res){
  res.render('correlation_search.jade', { 
	  title: 'Please enter a state abbr:' 
  });
};