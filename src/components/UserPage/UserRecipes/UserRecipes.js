import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRecipes.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { withRouter } from 'react-router';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

class UserRecipes extends Component {

    // state = {
    //     user_id: this.props.reduxState.user.user_id,
    //     userRecipeData: []
    // }

    componentDidMount() {
        this.getUserRecipeLibrary();
        console.log('Logged in users access level is', this.props.access_level)
        if(this.props.access_level === 1) {
          this.props.dispatch({type: 'FETCH_ALL_USERS'})
          }
    }

    getUserRecipeLibrary() {
        const user_id = this.props.user_id
        const action = {type: 'GET_USER_RECIPE_LIBRARY', user_id};
        this.props.dispatch(action);
        this.props.dispatch({type: 'FETCH_USER_PROFILE'});
    }

    deleteRecipeFromUserProfile = (key) => {
        confirmAlert({
            title: 'Do you really want to delete this recipe from your library?',
            message: `Recipe will be removed from your account.
                    This action is irreversible`,
            buttons: [
                {
                    label: 'No, just kidding.',
                  //   onClick: () => alert('Click No')
                  },
                {
                  label: 'Yeah, it\'s a garbage recipe.',
                  onClick: () => {
                    const payload = key;
                    const action = {type: 'DELETE_USER_RECIPE_FROM_LIBRARY', payload};
                    this.props.dispatch(action);
                  }
                },
              ]
        })
    }

    viewRecipe = (key) => (event) => {
        this.props.dispatch({type: 'GET_RECIPE_VIEW', payload: {key: key, history: this.props.history}});
        // console.log(key);
        // setTimeout(() => {
        //     this.props.history.push(`/recipe/${key}`);
        // }, 300);
  }

    render() {
        return (
            <div>
            {this.props.recipes.userRecipes ? (
                <table>
                    <thead>
                        <tr>
                        <th colSpan="3">{ this.props.first_name }'s Recipes</th>
                        </tr>
                    </thead>
                    <tbody>
                {this.props.recipes.userRecipes.map(recipe => (
                    <tr key={recipe.user_recipe_id}>
                        <td>{recipe.name}</td><td><button className="view-btn borderless-btn" key={recipe.id} alt={recipe.id} onClick={this.viewRecipe(recipe.id)}><FontAwesomeIcon icon="eye" /></button></td><td><button className="delete-btn borderless-btn" key={recipe.user_recipe_id} onClick={() => this.deleteRecipeFromUserProfile(recipe.user_recipe_id)}><FontAwesomeIcon icon="trash" /></button></td>
                    </tr>
                ))}
                    </tbody>
                </table>) : (<></>)}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    username: reduxState.user.username,
    first_name: reduxState.user.first_name,
    user_id: reduxState.user.user_id,
    recipes: reduxState.recipes,
    access_level: reduxState.user.access_level,
  });

export default connect(mapStateToProps)(withRouter(UserRecipes));