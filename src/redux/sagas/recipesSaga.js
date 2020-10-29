import axios from 'axios';
import { call, put, takeLatest, takeEvery, take, fork } from 'redux-saga/effects';

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
    const response = yield call(axios.get, `/recipe/${action.payload.key}`);
    // this will get the recipe for our
    // individual recipe page
    yield put({ type: 'SET_RECIPE_VIEW', payload: response.data});
    action.payload.history.push(`/recipe/${action.payload.key}`);
    console.log(response.data.recipe[0].id);
  } catch (error) {
    console.log('Recipe get request failed', error);
  }
}

function* getUserRecipeLibrary(action) {
  try {
    const response = yield call(axios.get, `/my-recipes`, action);
    // console.log(action);
    // individual recipe page
    yield put({ type: 'SET_USER_RECIPE_LIBRARY', payload: response.data });
    // console.log(response.data.recipe[0].id);
  } catch (error) {
    console.log('Recipe get request failed', error);
  }
}

function* deleteUserRecipeFromLibrary(action) {
  try {
  yield call(axios.delete, `/my-recipes/?user_recipe_id=${action.payload}`);
  yield put( { type: 'GET_USER_RECIPE_LIBRARY' } );
}
catch (error) {
  console.log('there was an error with your DELETE', error);
}
}

function* addNewRecipe(action) {
    console.log(action.payload)
    try {
    yield call(axios.post, '/api/add-a-recipe', action.payload);
    yield put( { type: 'SET_RECIPES' } );
    yield put( { type: 'GET_USER_RECIPE_LIBRARY' } );
}
catch (error) {
    console.log('there was an error with your post', error);
}
}

function* addRecipeToUserLibrary(action) {
  try {
    yield call(axios.post, '/user/recipes', action.payload);
    yield put( { type: 'GET_USER_RECIPE_LIBRARY' } );
  }
  catch (error){
  console.log('there was an error with your post', error);}
}

function* recipesSaga() {
  yield takeEvery('FETCH_RECIPES', fetchRecipes);
  yield takeEvery('ADD_NEW_RECIPE', addNewRecipe);
  yield takeEvery('GET_RECIPE_VIEW', getRecipeView);
  yield takeEvery('ADD_RECIPE_TO_USER_LIBRARY', addRecipeToUserLibrary);
  yield takeEvery('GET_USER_RECIPE_LIBRARY', getUserRecipeLibrary);
  yield takeEvery('DELETE_USER_RECIPE_FROM_LIBRARY', deleteUserRecipeFromLibrary);
}

export default recipesSaga;
