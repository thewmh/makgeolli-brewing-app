import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import HomePage from '../HomePage/HomePage';
import AddARecipe from '../AddARecipe/AddARecipe';
import ManageUsers from '../ManageUsers/ManageUsers';
import ManageRecipes from '../ManageRecipes/ManageRecipes';
import RecipeGallery from '../RecipeGallery/RecipeGallery';
import RecipePage from '../RecipePage/RecipePage';
import SuccessPage from '../SuccessPage/SuccessPage';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import './App.css';

library.add(faEye, faTrash, faEdit, faSave);

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'});
  }

  render() {
    return (
      <Router>
        <div>
          <Nav className="nav" />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            {/* <Redirect exact from="/" to="/home" /> */}
            {/* Visiting localhost:3000/home or /about will show the following pages.
            These routes anyone can see, no login necessary */}
            <Route
              exact
              path="/"
              component={RecipeGallery}
            />
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            <Route
              path="/recipe/:id"
              component={RecipePage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/success"
              component={SuccessPage}
            />
            <ProtectedRoute
              exact
              path="/user"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/info"
              component={InfoPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the add a recipe page. */}
            {(this.props.user.access_level <= 2) ? (<ProtectedRoute
              exact
              path="/add-a-recipe"
              component={AddARecipe}
            />) : (<></>)}
            {(this.props.user.access_level === 1) ? (<ProtectedRoute
              exact
              path="/admin/manage-users"
              component={ManageUsers}
            />) : (<></>)}
            {(this.props.user.access_level === 1) ? (<ProtectedRoute
              exact
              path="/admin/manage-recipes"
              component={ManageRecipes}
            />) : (<></>)}
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}
const mapStateToProps = state => ({
  user: state.user,
  access_level: state.user.access_level,
});

export default connect(mapStateToProps)(App);
