import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserRecipes.css';

class UserRecipes extends Component {

    // state = {
    //     user_id: this.props.reduxState.user.user_id,
    //     userRecipeData: []
    // }

    componentDidMount() {
        this.getUserRecipeLibrary();
    }

    getUserRecipeLibrary() {
        const user_id = this.props.user_id
        const action = {type: 'GET_USER_RECIPE_LIBRARY', user_id};
        this.props.dispatch(action);
    }

    deleteRecipeFromUserProfile = (key) => {
        const payload = key;
        const action = {type: 'DELETE_USER_RECIPE_FROM_LIBRARY', payload};
        this.props.dispatch(action);
    }

    render() {
        return (
            <div>
            {this.props.recipes.userRecipes ? (
                <table>
                    <thead>
                        <th>Recipe Name</th><th>View Recipe</th><th>Delete Recipe</th>
                    </thead>
                    <tbody>
                {this.props.recipes.userRecipes.map(recipe => (
                    <tr key={recipe.user_recipe_id}>
                        <td>{recipe.name}</td><td><button>View Recipe</button></td><td><button key={recipe.user_recipe_id} onClick={() => this.deleteRecipeFromUserProfile(recipe.user_recipe_id)}>Remove Recipe</button></td>
                    </tr>
                ))}
                    </tbody>
                </table>) : (<></>)}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    user_id: reduxState.user.user_id,
    recipes: reduxState.recipes
  });

export default connect(mapStateToProps)(UserRecipes);