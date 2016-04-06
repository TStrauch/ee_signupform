var express = require('express');
var apiRouter = express.Router();

var pg = require('pg');
// pg.defaults.ssl = true;

var local_db = 'postgres://dev_user:dev_password@localhost/ee_signupform'

/* GET home page. */
apiRouter.route('/')
  .get(function(req, res){
    res.status(200).send('The API is working. yiha!');
  });

apiRouter.route('/signup')
  .post(function(req, res){

    var name = req.body.name;
    var email = req.body.email;

    if(name === undefined || email === undefined ){
      res.status(400).json('{message: required parameters were left unspecified.}');
    }

    pg.connect(process.env.DATABASE_URL || local_db, function(err, client) {
      if (err) throw err;
      // console.log('Connected to postgres! Getting schemas...');

      // client
      //   .query('SELECT NOW() AS "theTime"', function(err, result) {
      //     if(err) {
      //       res.status(500).json(err);
      //     }
      //     console.log(result.rows[0].theTime);
      //     //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
      //     client.end();
      //     res.status(200).json(result);
      //   });

       client
        .query('INSERT INTO testapi VALUES ($1, $2)', [name, email], function(err, result){
          if(err) {
            res.status(500).json(err);
          }
          client.end();
          res.status(201).end();

        });
    });
  });


  apiRouter.route('/signups')
    .get(function(req, res){
      pg.connect(process.env.DATABASE_URL || local_db, function(err, client) {
        if(err) throw err;
        client
          .query('SELECT * FROM testapi', function(err, result){
            if(err) {
              res.status(500).json(err);
            }
            client.end()

            res.status(200).json(result.rows);
          });
      });
  });


module.exports = apiRouter;


// connect to remote postgres: $ heroku pg:psql
// connect to local postgres: psql
// valuable commands: \list, \connect <db_name>, \du, \d, \q
