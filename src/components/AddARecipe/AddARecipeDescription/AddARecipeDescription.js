import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddARecipeDescription extends Component {

    state = {
        title: '',
        titleEdit: true,
        description: '',
        descriptionEdit: true,
    }

    saveRecipeTitle = (event) => {
        event.preventDefault();
        console.log(this.state.title);
        if(this.state.title !== ''){
            this.props.dispatch({type: 'ADD_RECIPE_TITLE', payload: this.state});
            this.setState({titleEdit: false});
        } else {
                alert ('Please add a title for your recipe!')
            }
        }

        editRecipeTitle = (event) => {
            event.preventDefault();
                this.setState({titleEdit: true, title: this.state.title});
            }

    saveRecipeDescription = (event) => {
        event.preventDefault();
        console.log(this.state.description);
        if(this.state.description !== ''){
            this.props.dispatch({type: 'ADD_RECIPE_DESCRIPTION', payload: this.state});
            this.setState({descriptionEdit: false});
        } else {
                alert ('Please add a description for your recipe!')
            }
        }

        editRecipeDescription = (event) => {
            event.preventDefault();
            this.setState({descriptionEdit: true});
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
                {this.state.titleEdit ? <><input type="text" id="nme"
                       name="title" value={this.state.title} onChange={this.handleChange} class="question" required autocomplete="off" />
                       <label for="nme"><span>What is the name of your recipe?</span></label>
                <button onClick={this.saveRecipeTitle}>Save Title</button></> : <><h3>Recipe Title</h3><input disabled type="text" id="nme"
                       name="title" value={this.state.title} onChange={this.handleChange} class="question" required autocomplete="off" />
                       <button onClick={this.editRecipeTitle}>Edit Title</button></>}
                {this.state.descriptionEdit ? <><textarea id="recipe-description" name="description"
                          value={this.state.description} onChange={this.handleChange} class="question" required autocomplete="off" />
                <label for="recipe-description"><span>Describe your recipe</span></label>
                <button onClick={this.saveRecipeDescription}>Save Description</button></> : <><h3>Recipe Description</h3><textarea id="recipe-description" name="description"
                          value={this.state.description} onChange={this.handleChange} class="question" required autocomplete="off" disabled/>
                <button onClick={this.editRecipeDescription}>Edit Description</button></> }
            </div>
        );
    }
}
const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(AddARecipeDescription);