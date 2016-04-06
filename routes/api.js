var express = require('express');
var apiRouter = express.Router();

var pg = require('pg');
// pg.defaults.ssl = true;



/* GET home page. */
apiRouter.route('/')
  .get(function(req, res){
    res.status(200).send('The API is working. yiha!');
  });

apiRouter.route('/signup')
  .post(function(req, res){

    pg.connect(process.env.DATABASE_URL, function(err, client) {
      if (err) throw err;
      console.log('Connected to postgres! Getting schemas...');

      client
        .query('SELECT table_schema,table_name FROM information_schema.tables;')
        .on('row', function(row) {
          console.log(JSON.stringify(row));
        });
    });

    res.status(200).send('done.');

  });


module.exports = apiRouter;
