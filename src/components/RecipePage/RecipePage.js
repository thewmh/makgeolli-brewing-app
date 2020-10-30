import React, { Component } from 'react';
import { connect } from 'react-redux';
import './RecipePage.css';

class RecipePage extends Component {

    addRecipeToUserLibrary = (id) => (event) => {
            this.props.dispatch({type: 'ADD_RECIPE_TO_USER_LIBRARY', payload: {recipe_id: id, user_id: this.props.reduxState.user.user_id}});
            this.props.history.push(`/user`);
    }

    // handleSubmit = (user) => {
    //     saveUser(user).then(() =>
    //       this.props.history.push('/dashboard')
    //     ))
    //   }

    getRecipe = (key) => (event) => {
        this.props.dispatch({type: 'GET_RECIPE_VIEW', payload: {key: this.props.reduxState.recipes.recipe[0].id}});
    }
    
      componentDidMount () {
        this.getRecipe();
      }

    render() {
        return (
            <div className="recipe">
                    <div className="add-recipe-btn-div">
                    {this.props.reduxState.user.user_id ? <button className="add-recipe-btn" onClick={this.addRecipeToUserLibrary(this.props.reduxState.recipes.recipe[0].id)}>Add this recipe to your library</button> : <></>}
                    </div>
                <div className="recipe-name-ingredients">
                {this.props.reduxState.recipes.recipe.map(recipe => (
                    <div className="recipe-name">
                    <h1>{recipe.name}</h1>
                    <p>{recipe.description}</p>
                    </div>
                ))}
                    <div className="recipe-ingredients">
                    <table><thead><tr><th>Ingredient</th><th>Quantity</th><th>Measure</th></tr></thead><tbody>
                    {this.props.reduxState.recipes.ingredients.map((recipe, index) => (
                        <>
                        <tr key={index}>
                        <td>{recipe.ingredient_name}</td><td>{recipe.ingredient_quantity}</td><td>{recipe.ingredient_measure}</td>
                        </tr>
                        </>
                    ))}
                    {/* <tr><td><button>Calculate your own</button></td></tr> */}
                    </tbody>
                    </table>
                    </div>
                    </div>
                    <div className="recipe-instructions">
                    <h1 id="brew-inst-title">{this.props.reduxState.recipes.recipe[0].name}<br/>Brewing Instructions</h1>
                    {this.props.reduxState.recipes.instructions.map(recipe => (
                    <>
                    <span className="ins-init"><h1>{recipe.instruction_number}</h1></span><span className="ins-init"><p>{recipe.instruction_details}</p></span>
                    </>
                ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(RecipePage);