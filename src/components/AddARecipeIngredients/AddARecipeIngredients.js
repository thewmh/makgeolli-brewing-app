import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EventEmitter } from 'events';

class AddARecipeIngredients extends Component {

    state = {
            ingredients: [{ name: '', quantity: 0, id: 1 }]
    }

    componentDidMount() {
        const action = {type: 'FETCH_RECIPE_INGREDIENT_UNITS'};
        this.props.dispatch(action);
    }

    handleChange = (i) => (event) => {
        console.log(event.target.value);
        const newIngredients = this.state.ingredients.map((ingredient, si) => {
            if (i !== si) return ingredient;
            return { ...ingredient, [event.target.name]: event.target.value };
         });
        this.setState({ ingredients: newIngredients });
        }

    // submitIngredients = (event) => {
    //     event.preventDefault();
    //     this.props.dispatch({ type: 'NEW_INGREDIENT', payload: this.state.newIngredient })
    //     this.setState({
    //         newIngredient: {
    //             name: '',
    //             quantity: '',
    //             id: '',
    //             }
    //     });
    //     this.clearInputFields();
    // }

    handleAddIngredient = (event) => {
        event.preventDefault();
        this.setState({
          ingredients: this.state.ingredients.concat([{ name: '', quantity: 0, id: 1 }])
        });
      }

    handleRemoveIngredient = (i) => (event) => {
        event.preventDefault();
        this.setState({
            ingredients: this.state.ingredients.filter((s, si) => i !== si)
        });
    }

    clearInputFields = () => {
        this.setState( this.ingredient );
    }

    saveIngredientState = (event) => {
        event.preventDefault();
        console.log(this.state.ingredients);
        if(this.state.ingredients[0].name !== ''){
            this.props.dispatch({type: 'ADD_RECIPE_INGREDIENTS', payload: this.state});} else {
                alert ('Please add ingredients for your recipe!')
            }
        }
    

    render() {
        return (
            <div className="add-ingredients">
                {JSON.stringify(this.state)}
                <p>Add your recipe ingredients here.</p>
                <form onSubmit={this.submitIngredients}>
                {this.state.ingredients.map((ingredient, i) => (
                    <span class="individual-ingredient">
                        <input type="text" name="name" placeholder="Enter Ingredient Name"
                        value={ingredient.name} onChange={this.handleChange(i)} class="ingredient-input"/>

                        <input type="number" name="quantity" placeholder="Enter Ingredient Quantity"
                        value={ingredient.quantity} onChange={this.handleChange(i)} class="ingredient-input"/>

                        <select required placeholder="Select Ingredient Measure"
                        value={ingredient.id} onChange={this.handleChange(i)} name="id">{this.props.reduxState.ingredientUnits.map(name => (<option key={name.id} value={name.id}>{name.name}</option>))}</select>
                        {this.state.ingredients.length <= 1 ? (<></> ) : (<button onClick={this.handleRemoveIngredient(i)}>Remove Ingredient {i+1}</button>) }
                    </span>
                ))}<br />
                <button type="button" onClick={this.handleAddIngredient}>Add another Ingredient +</button>
                <br /><br /><br />
                <button onClick={this.saveIngredientState}>Save Ingredient List</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(AddARecipeIngredients);