
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const ingredientUnitsRouter = require('./routes/ingredientUnits.router');
const recipesRouter = require('./routes/recipes.router');
const individualRecipeRouter = require('./routes/individualRecipe.router');
const addRecipeToLibrary = require('./routes/addRecipeToLibrary.router');
const myRecipesRouter = require('./routes/myRecipes.router');
const userProfileRouter = require('./routes/userProfile.router');
const adminRouter = require('./routes/admin.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/ingredient-units', ingredientUnitsRouter);
app.use('/recipes', recipesRouter);
app.use('/api/add-a-recipe', recipesRouter);
app.use(`/recipe`, individualRecipeRouter);
app.use(`/user/recipes`, addRecipeToLibrary);
app.use(`/my-recipes`, myRecipesRouter);
app.use(`/api/user/profile`, userProfileRouter);
app.use(`/api/admin/manage-users`, adminRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
