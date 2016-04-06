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

    pg.connect(process.env.DATABASE_URL || local_db, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');

      client
        .query('SELECT COUNT(*) FROM testapi;')
        .on('row', function(row) {
          console.log(JSON.stringify(row));
        });
    });

    res.status(200).send('done.');

  });


module.exports = apiRouter;


// connect to remote postgres: $ heroku pg:psql
// connect to local postgres: psql
// valuable commands: \list, \connect <db_name>, \du, \d, \q
