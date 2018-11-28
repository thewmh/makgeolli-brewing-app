import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import './RecipeGallery.css';

class RecipeGallery extends Component {

    state = {
        recipe:{
          path: '',
          description: '',
          likes: '',
        },
        recipeData: [ ],
      }
      
      getRecipes = () => {
        axios.get('/recipes').then( (response) => {
          console.log(response.data);
          this.setState({
            recipeData: response.data
            });
          }).catch( error => {
            console.log('There was an error retreiving the recipes', error);
        })
      }
    
      componentDidMount () {
        this.getRecipes();
      }

      viewRecipe = (key) => (event) => {
          this.props.dispatch({type: 'GET_RECIPE_VIEW', payload: {key: key, history: this.props.history}});
    }
          
    

    render() {
        return (
            <div className="recipe-wrap">
                {this.state.recipeData.map(recipe => (
                    <div key={recipe.id} className="recipe-gallery-card">
                    <h1>{recipe.name}</h1>
                    <p>{recipe.description}</p>
                    <button key={recipe.id} alt={recipe.id} onClick={this.viewRecipe(recipe.id)}>View this recipe</button>
                    </div>
                ))}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(RecipeGallery);