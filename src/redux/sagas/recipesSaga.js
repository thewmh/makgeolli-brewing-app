import axios from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_RECIPES" actions
function* fetchRecipes() {
  try {
    const response = yield axios.get('/api/recipes');
    // this will get the ingredient measurement units for our
    // add a recipe page
    yield put({ type: 'SET_RECIPES', payload: response.data });
  } catch (error) {
    console.log('Recipe get request failed', error);
  }
}

function* getRecipeView(action) {
  try {
    const response = yield call(axios.get, `/recipe/${action.payload}`);
    // this will get the recipe for our
    // individual recipe page
    yield put({ type: 'SET_RECIPE_VIEW', payload: response.data });
    console.log(response.data);
  } catch (error) {
    console.log('Recipe get request failed', error);
  }
}

function* addNewRecipe(action) {
    console.log('The action received by addNewRecipe is:', );
    try {
    yield call(axios.post, '/api/add-a-recipe', action.payload);
    yield put( { type: 'SET_RECIPES' } );
}
catch (error) {
    console.log('there was an error with your post', error);
}
}

function* addRecipeToUserLibrary(action) {
  try {
    yield call(axios.post, '/user/recipes', action.payload);
  }
  catch (error){
  console.log('there was an error with your post', error);}
}

function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeEvery('ADD_NEW_RECIPE', addNewRecipe);
  yield takeEvery('GET_RECIPE_VIEW', getRecipeView);
  yield takeEvery('ADD_RECIPE_TO_USER_LIBRARY', addRecipeToUserLibrary);
}

export default recipesSaga;
