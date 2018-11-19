import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_RECIPE_INGREDIENT_UNITS" actions
function* fetchIngredientUnits() {
  try {
    const response = yield axios.get('api/ingredient-units');
    // this will get the ingredient measurement units for our
    // add a recipe page
    yield put({ type: 'SET_RECIPE_INGREDIENT_UNITS', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* ingredientUnitsSaga() {
  yield takeLatest('FETCH_RECIPE_INGREDIENT_UNITS', fetchIngredientUnits);
}

export default ingredientUnitsSaga;
