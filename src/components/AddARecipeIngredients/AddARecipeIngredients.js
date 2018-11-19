import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddARecipeIngredients extends Component {

    state = {
        newIngredient: {
            name: '',
            quantity: 0,
            id: 1,
            ingredients: [{ name: '', quantity: 0, id: 1 }]
        }
    }

    componentDidMount() {
        const action = {type: 'FETCH_RECIPE_INGREDIENT_UNITS'};
        this.props.dispatch(action);
    }

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            newIngredient: {
                ...this.state.newIngredient, [event.target.name]: event.target.value,
            }
        })
    }

    submitIngredients = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'NEW_INGREDIENT', payload: this.state.newIngredient })
        this.setState({
            newIngredient: {
                name: '',
                quantity: '',
                id: '',
                }
        });
        this.clearInputFields();
    }

    clearInputFields = () => {
        this.setState( this.newIngredient );
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.props.reduxState.ingredientUnits)}
                <p>Add your recipe ingredients here.</p>
                <form onSubmit={this.submitIngredients}>
                {this.state.newIngredient.ingredients.map((ingredient, i) => (<>
                <input type="text" name="name" value={this.state.newIngredient.name} onChange={this.handleChange}/>
                <input type="number" name="quantity" value={this.state.newIngredient.quantity} onChange={this.handleChange}/>
                <select required placeholder="Select Ingredient Measure" value={this.state.newIngredient.id} onChange={this.handleChange} name="id">{this.props.reduxState.ingredientUnits.map(name => (<option key={name.id} value={name.id}>{name.name}</option>))}</select></>
                ))}
                <button type="button" onClick={this.handleAddIngredient}>Add another ingredient</button>
                <button>Save Ingredient List</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(AddARecipeIngredients);