var express = require('express');
var router = express.Router();
var models = require('../models')

// by adding attributes we are choosing which columns we want to include, rather than including every one.

router.get('/', function(req, res, next) {
    models.actor
      .findAll({ 
          attributes: ['actor_id', 'first_name', 'last_name' ],
          include: [{ 
            model: models.film,
            attributes: [ 'film_id', 'title', 'description', 'rental_rate', 'rating' ] 
          }]
      })
      .then(actorsFound => {
          res.setHeader('Content-Type', 'applications/json');
          res.send(JSON.stringify(actorsFound));
      });
  });

  
  // this will find one actor by the id
  // WHERE the id that was passed along matches the one in the table
  
  router.get('/:id', function(req, res, next) {
      models.actor.findByPk(parseInt(req.params.id), {
        include: [{ model: models.film }]
      })
      // this is sending the object off as a JSON
      .then(actorFound => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(actorFound));
      })
  });
  
  // router.post('/', function(req, res, next) {
  //   models.actor.create(req.body)
  //     .then(newActor => {
  //       res.setHeader('Content-Type', 'application/json');
  //       res.send(JSON.stringify(newActor));
  //     })
  //     .catch(err => {
  //       res.status(400);
  //       res.send(err.message);
  //     })
  // });
  
  router.post('/', function(req, res, next) {
    models.actor.findOrCreate({
      where: {
        first_name: req.body.first_name,
        last_name: req.body.last_name
      }
      // the spread function is checking on the result of the findOrCreate()
      // if created, we will redirect to actors and will show the result of that actor by id
    }).spread(function(result, created) {
        if (created) {
          res.redirect('/actors/' + result.actor_id);
        } else {
          res.status(400);
          res.send('Actor already exists.');
        }
      });
  });
  
  router.put('/:id', function(req, res, next){
    let actorId = parseInt(req.params.id);
  
    models.actor
      .update(req.body, { where: {actor_id: actorId }})
        .then(result => res.redirect('/actors/' + actorId))
        .catch(err => {
          res.status(400);
          res.send('There was a problem updating the actor. Please check the actor information.');
        });
  });
  
  // request, response, next
  router.delete('/:id', function(req, res, next) {
    let actorId = parseInt(req.params.id);
  
    models.actor
      .destroy({ where: { actor_id: actorId }})
      .then(result => res.redirect('/actors'))
      .catch(err => {
        res.status(400);
        res.send("There was a problem deleting the actor. Please make sure you are specifying the correct id.")
      });
  });


module.exports = router;