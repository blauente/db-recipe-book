const db = require('./dbConfig');

module.exports = {
    getDishes: function(id) {
        let query = db('dishes');

        if (id) {
            return query
                .where('id', id)
                .first()
                .then(dish => dish);
        }

        return query.then(dishes => {
            return dishes;
        });
    },

    addDish: function(dish) {
        return db('dishes')
            .insert(dish)
            .then(([id]) => this.getDishes(id))
    },

    getDish: function(id) {
        let query = db('dishes');
        return query
        .where('id', id)
        .first()
        .then(dish => dish);
    },

    updateDish: function(id, changes) {
        return db('dishes')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? this.getDishes(id) : null))
    },

    deleteDish: function(id) {
        return db('dishes')
        .where('id', id)
        .del();
    },

    getRecipes: function(id) {
        let query = db('recipes');

        if (id) {
            return query
                .where('id', id)
                .first()
                .then(dish => dish);
        }

        return query
        .join('dishes', 'recipes.dish_id', 'dishes.id')
        .select('recipes.id', 'recipes.name', 'dishes.name as dish_type', 'recipes.dish_id', 'recipes.ingredients', 'recipes.instructions')
        .then(recipes => {
            return recipes;
        });
    },

    getRecipe: function(id) {
        let query = db('recipes');
        return query
            .where('id', id)
            .first()
            // .join('ingredients', {[Array.from('recipes.ingredients'.split(' ')).map(ingredient => ingredient)]: 'ingredients.id'})
            // .select('recipes.id', 'recipes.name', 'recipes.dish_id', 'ingredients.id', 'recipes.instructions')
            .then(recipe => recipe);
    },

    addRecipe: function(recipe) {
        return db('recipes')
            .insert(recipe)
            .then(([id]) => this.getRecipes(id))
    },

    updateRecipe: function(id, changes) {
        return db('recipes')
        .where('id', id)
        .update(changes)
        .then(count => (count > 0 ? this.getRecipes(id) : null))
    },

    deleteRecipe: function(id) {
        return db('recipes')
        .where('id', id)
        .del();
    },
}