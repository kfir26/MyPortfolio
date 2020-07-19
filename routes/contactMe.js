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
router.get('/', function(req, res, next){
    res.send('Im here bro');
  });


// HTTP Methodes: get ,post , update , delete
router.get('/createTable', function(req, res, next){
    // 'CREATE TABLE IF NOT EXISTS Students (id SERIAL,firstName TEXT, lastName TEXT)'
    const sql = 'CREATE TABLE Messages(id SERIAL, name TEXT, email TEXT, services TEXT, subject TEXT)'
  
    pool.query(sql,[], function(err,dbRes){
      if(err){
        //responsed an object as json
        return res.json(err)
        //return since we cant respond twice
      }
      res.json({ message: "Table is Online sir ."})
      })
  });
  
  /* get all messages */
  router.get('/getMessages', function(req, res, next){
   const sql = 'SELECT * FROM Messages'
  
   pool.query(sql,[], function(err,dbRes){
     if(err){
       //responsed an object as json
       return res.json(err)
       //return since we cant respond twice
     }
     res.json({ 'Messages': dbRes.rows })
    })
  });

  router.post('/saveMessages', function(req, res, next){
    let name = req.body.name
    let email = req.body.email
    let services = req.body.services
    let subject = req.body.subject

    let params = [name, email, services, subject]
    const sql = "INSERT INTO Messages(name, email, services, subject) VALUES($1, $2, $3, $4);"

  
   pool.query(sql,params,function(err,dbRes){
     if(err){
       //responsed an object as json
       return res.json(err)
     } 
     res.json({ 'Messages': 'client added succesfully' })
    })
});

  //delete
  router.delete('/deleteMessage', function(req,res,next){
    let id =  req.body.id
    if(!id){
      return res.json({'error':'no id'})
    }

    const sql = `DELETE FROM Messages WHERE id = $1`

    let params = [id]

    pool.query(sql,params, function(err,dbRes){
        if(err){
            //responsed an object as json
            return res.json(err)
            //return since we cant respond twice
          }
          res.json({ 'Messages': 'message deleted succesfully' })
        })
    })

  module.exports = router;