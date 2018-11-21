import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddARecipeDescription from '../AddARecipeDescription/AddARecipeDescription';
import AddARecipeIngredients from '../AddARecipeIngredients/AddARecipeIngredients';
import AddARecipeInstructions from '../AddARecipeInstructions/AddARecipeInstructions';
import '../AddARecipe/AddARecipe.css';

class AddARecipe extends Component {

    state = {
        recipe: {
            title: '',
            description: '',
            ingredients: [],
            instructions: []
        }
    }

    componentDidMount() {
        const action = {type: 'FETCH_RECIPES'};
        this.props.dispatch(action);
    }

    submitNewRecipe = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'ADD_NEW_RECIPE', payload: this.props.reduxState.recipes});
        // this.sendRecipe();
    }

    render() {
        return (
            <div className="add-a-recipe">
                {/* {JSON.stringify(this.state)}<br/> */}
                <AddARecipeDescription />
                <AddARecipeIngredients />
                <AddARecipeInstructions />
                <br /><br /><br />
                <button onClick={this.submitNewRecipe}>Save Recipe</button>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(AddARecipe);