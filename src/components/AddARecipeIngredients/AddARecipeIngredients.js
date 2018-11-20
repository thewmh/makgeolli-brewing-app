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

    logIngredientState = (event) => {
        event.preventDefault();
        console.log(this.state.ingredients);
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state)}
                <p>Add your recipe ingredients here.</p>
                <form onSubmit={this.submitIngredients}>
                {this.state.ingredients.map((ingredient, i) => (
                    <>
                        <input type="text" name="name" placeholder="Enter Ingredient Name"
                        value={ingredient.name} onChange={this.handleChange(i)}/>

                        <input type="number" name="quantity" placeholder="Enter Ingredient Quantity"
                        value={ingredient.quantity} onChange={this.handleChange(i)}/>

                        <select required placeholder="Select Ingredient Measure"
                        value={ingredient.id} onChange={this.handleChange(i)} name="id">{this.props.reduxState.ingredientUnits.map(name => (<option key={name.id} value={name.id}>{name.name}</option>))}</select>
                        <button onClick={this.handleRemoveIngredient(i)}>Remove this ingredient</button>
                    </>
                ))}
                <button type="button" onClick={this.handleAddIngredient}>Add another ingredient</button>
                <button onClick={this.logIngredientState}>Save Ingredient List</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(AddARecipeIngredients);