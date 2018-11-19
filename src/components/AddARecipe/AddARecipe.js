import React, { Component } from 'react';
import AddARecipeDescription from '../AddARecipeDescription/AddARecipeDescription';
import AddARecipeIngredients from '../AddARecipeIngredients/AddARecipeIngredients';
import AddARecipeInstructions from '../AddARecipeInstructions/AddARecipeInstructions';

class AddARecipe extends Component {
    render() {
        return (
            <div>
                <AddARecipeDescription />
                <AddARecipeIngredients />
                <AddARecipeInstructions />
            </div>
        );
    }
}

export default AddARecipe;