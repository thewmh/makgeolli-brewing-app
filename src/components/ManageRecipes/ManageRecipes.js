import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { confirmAlert } from 'react-confirm-alert';
import './ManageRecipes.css'

class ManageRecipes extends Component {

    state = {
        edit: true,
        recipe: {
          name: '',
          description: '',
          is_published: 0,
          added_by: 0,
          image: null,
          id: 0,
        },
    }
    
    componentDidMount(){
        this.props.dispatch({type: 'FETCH_ALL_USERS'})
    }

    handleEdit = (recipe) => () => {
        this.setState({
            ...this.state,
            recipe: recipe,
            updateRecipe: recipe,
          });
        console.log(recipe);
    }

  handleDelete = (recipe) => () => {
    console.log('Clicked Delete button', recipe)
    // alert('Sure about that?');
    confirmAlert({
      title: `Definitely want to delete ${recipe.name} from 막?`,
      buttons: [
          {
              label: 'No, just kidding.',
            //   onClick: () => alert('Click No')
            },
          {
            label: `Yeah, get ${recipe.name} outta here!`,
            onClick: () => {
              this.props.dispatch({type: 'REMOVE_RECIPE', payload: recipe.id})
            }
          },
        ],
        message: `This action is irreversible`,
  })
  }

  //renders the edit/save button
  renderEditButton = (recipe) => {
    if(this.state.edit === true && this.state.recipe === recipe){
      return (
        <button className="borderless-btn" onClick={this.handleSave}>
        <FontAwesomeIcon icon="save" />
        </button>
      );
    }else{
        return(
          <button className="borderless-btn" onClick={this.handleEdit(recipe)}>
          <FontAwesomeIcon icon="edit" />
          </button>
          
      )
    }
  }

    render() {
        return (
            <div className="manage-recipes">
                <h1>Manage Recipes</h1>
                {this.props.reduxState.admin.recipes ? (<table className="admin-recipe-table">
                    <thead>
                        <tr>
                            <th>Recipe Title</th><th>Published?</th><th>Added By</th><th>Edit Recipe</th><th>Delete Recipe</th>
                        </tr>
                    </thead>
                    <tbody>
                {this.props.reduxState.admin.recipes.map((recipe, index) => (
                        <>
                        <tr key={index}>
                        <><td>{recipe.name}</td><td>{recipe.is_published === 1 ? (<>Yes</>) : (<>No</>)}</td>
                        <td>{recipe.added_by}</td></><td>{this.renderEditButton(recipe)}</td><td><button className="borderless-btn" onClick={this.handleDelete(recipe)}><FontAwesomeIcon icon="trash" /></button></td></tr></>))}
                    </tbody>
                </table>) : (<></>)}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(ManageRecipes);