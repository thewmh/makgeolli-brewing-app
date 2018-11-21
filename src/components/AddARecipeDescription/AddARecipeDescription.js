import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddARecipeDescription extends Component {

    state = {
        title: '',
        description: '',
    }

    saveRecipeTitle = (event) => {
        event.preventDefault();
        console.log(this.state.title);
        if(this.state.title !== ''){
            this.props.dispatch({type: 'ADD_RECIPE_TITLE', payload: this.state});} else {
                alert ('Please add a title for your recipe!')
            }
        }

    saveRecipeDescription = (event) => {
        event.preventDefault();
        console.log(this.state.description);
        if(this.state.description !== ''){
            this.props.dispatch({type: 'ADD_RECIPE_DESCRIPTION', payload: this.state});} else {
                alert ('Please add a description for your recipe!')
            }
        }

    handleChange = (event) => {
        console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="add-description">
                <input type="text" id="nme"
                       name="title" value={this.state.title} onChange={this.handleChange} class="question" required autocomplete="off" />
                       <label for="nme"><span>What is the name of your recipe?</span></label>
                <button onClick={this.saveRecipeTitle}>Save Title</button>
                <textarea id="recipe-description" name="description"
                          value={this.state.description} onChange={this.handleChange} class="question" required autocomplete="off" />
                <label for="recipe-description"><span>Please describe your recipe</span></label>
                <button onClick={this.saveRecipeDescription}>Save Description</button>
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(AddARecipeDescription);