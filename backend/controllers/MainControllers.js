module.exports = {
	home: home,
	shedule:shedule,
	workshops:workshops
}

function home(req,res){
	res.render('index.ejs');
}
