import axios from 'axios';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_RECIPES" actions
function* fetchRecipes() {
  try {
    const response = yield axios.get('api/recipes');
    // this will get the ingredient measurement units for our
    // add a recipe page
    yield put({ type: 'SET_RECIPES', payload: response.data });
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

function* recipesSaga() {
  yield takeLatest('FETCH_RECIPES', fetchRecipes);
  yield takeEvery('ADD_NEW_RECIPE', addNewRecipe);
}

export default recipesSaga;
