import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddARecipeInstructions extends Component {

    state = {
        instructions: [{ instruction_details: '' }]
    }

    handleChange = (i) => (event) => {
        console.log(event.target.value);
        const newInstruction = this.state.instructions.map((instruction, si) => {
            if ( i !== si ) return instruction;
            return { ...instruction, [event.target.name]: event.target.value };
        });
        this.setState({ instructions: newInstruction });
    }

    handleAddInstruction = (event) => {
        event.preventDefault();
        this.setState({
            instructions: this.state.instructions.concat([{
                instruction_details: ''
            }])
        });
    }

    handleRemoveInstruction = (i) => (event) => {
        event.preventDefault();
        this.setState({
            instructions: this.state.instructions.filter((s, si) => i !== si)
        });
    }

    clearInputFields = () => {
        this.setState(
            this.instructions
        );
    }

    saveInstructionState = (event) => {
        event.preventDefault();
        if(this.state.instructions[0].instruction_details !== ''){
            this.props.dispatch({type: 'ADD_RECIPE_INSTRUCTIONS', payload: this.state});} else {
                alert ('Please add instructions for your recipe!');
            }
        }

    render() {
        return (
            <div>
                {/* {JSON.stringify(this.state)}
                Add your recipe instructions here. */}
                <form onSubmit={this.submitInstructions} className="instruction-form">
                {this.state.instructions.map((instruction, i) => (
                    <>

                    {/* <textarea id="recipe-description" name="description"
                          value={this.state.description} onChange={this.handleChange} class="question" required autocomplete="off" />
                <label for="recipe-description"><span>Please describe your recipe</span></label> */}
                    <label for="recipe-instruction" value={instruction.instruction_number}><span>Instruction Number {i+1}</span></label>
                    <textarea type="text" name="instruction_details" 
                    id="recipe-instruction" value={instruction.instruction_details}
                    onChange={this.handleChange(i)} class="question" required autocomplete="off"/>
                    <label for="recipe-instruction"><span>Enter the details of this instruction</span></label>
                    {this.state.instructions.length <= 1 ? (<></> ) : (<button onClick={this.handleRemoveInstruction(i)}>Remove this Instruction -</button>) }
                    </>
                ))}<br />
                <button onClick={this.handleAddInstruction}>Add another Instruction +</button>
                <br /><br /><br />
                <button onClick={this.saveInstructionState}>Save Instructions</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(AddARecipeInstructions);