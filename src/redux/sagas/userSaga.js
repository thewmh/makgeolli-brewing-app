import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('api/user', config);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* fetchAllUsers() {
  console.log('Fetching all users');
  try {
    const response = yield axios.get('api/admin/manage-users');
    yield put({ type: 'SET_ALL_USERS', payload: response.data });
  } catch (error) {
    console.log('There was an error with fetchAllUsers Saga:', error)
  }
}

function* editUser(action) {
  try {
    yield call(axios.put, '/api/admin/edit-user', action.payload);
    yield put( { type: 'FETCH_ALL_USERS' } );
}
catch (error) {
    console.log('there was an error with your post', error);
}
}

function* deleteUser(action) {
  try {
    console.log(action.payload);
    yield call(axios.delete, `/api/admin/delete-user/?user_id=${action.payload}`);
    yield put( { type: 'FETCH_ALL_USERS' } );
}
catch (error) {
    console.log('there was an error with your DELETE', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeLatest('FETCH_ALL_USERS', fetchAllUsers);
  yield takeLatest('EDIT_USER', editUser);
  yield takeLatest('REMOVE_USER', deleteUser);
}

export default userSaga;
