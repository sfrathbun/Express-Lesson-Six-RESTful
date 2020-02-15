// this defines the association between our actors and films

module.exports = function(models) {
    models.actor.belongsToMany(models.film, {
        through: models.film_actor,
        foreignKey: 'actor_id'
    });
    models.film.belongsToMany(models.actor, {
        through: models.film_actor,
        foreignKey: 'film_id'
    });
}

// for the L06HandsOn, I did not have to add anything to the associations because we are just returning data from one table.
// there is no need to associate it with another table. 
