var express = require('express');
var router = express.Router();

const { Pool } = require('pg');
	const pool = new Pool({
 	connectionString: process.env.DATABASE_URL,
 	 ssl: {
  	  rejectUnauthorized: false
	  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//The post request has to be here since this is the router in which the form is and where we send the post request to
router.post('/', function(req,res,next){
  let name = req.body.name
  let email = req.body.email
  let services = req.body.services
  let subject = req.body.subject


  const sql = 'INSERT INTO Messages(name, email, services, subject) VALUES ($1, $2, $3, $4);'
  let params = [name, email, services, subject]

  pool.query(sql, params, function(err, dbRes){
      if(err){
          return res.json(err)
      }

       res.json({ 'messgae': 'student added succesfully' })
     })
});


module.exports = router;



// run code for every cahnge: --> ----->
// git add . && git commit -m "api" && git push heroku master && heroku open && heroku logs --tail