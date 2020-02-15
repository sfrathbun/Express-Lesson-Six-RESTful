var express = require('express');
var router = express.Router();
var models = require('../models')


// this "get" will return all of the films in the film table
  router.get('/', function(req, res, next) {
    models.film
      .findAll({
          // if we wanted, we can pass along certain attributes to get certain data instead of returning everything
        //   attributes: ['film_id', 'title', 'release_year', 'length', 'rental_rate' ]
      })
        .then(filmsFound => {
            res.setHeader('Content-Type', 'applications/json');
            res.send(JSON.stringify(filmsFound));
        });
  });

// this "get" will return the film based on the id that we pass along in the url
// here we are using the findByPk which finds the film using the primary key, which is the id
  router.get('/:id', function(req, res, next) {
    models.film
      .findByPk(parseInt(req.params.id)
// here we can also pass along attributes if we only wanted to show certain information about that film by the id
      // , { attributes: ['film_id', 'title', 'release_year', 'length', 'rental_rate' ]}  
// in this case we are returning all the data of the film by id
      )
        .then(filmsFound => {
            res.setHeader('Content-Type', 'applications/json');
            res.send(JSON.stringify(filmsFound));
        });
  });
 

// my "put" will update a film based on the id that we pass along in the url
// here we can update anything within the film table
  router.put('/:id', function(req, res, next) {
      let filmId = parseInt(req.params.id);
      
      models.film
        .update(req.body, { where: { film_id: filmId }})
            .then(result => res.redirect('/films/' + filmId))
            .catch(err => {
                res.status(400);
                res.send('There was a problem updating the film. Please check film info.');
            });
  });
 

  module.exports = router;