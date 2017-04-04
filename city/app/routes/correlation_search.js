exports.do_work = function(req, res){
  res.render('correlation.jade', { 
	  title: 'Please enter a state abbr:' 
  });
};