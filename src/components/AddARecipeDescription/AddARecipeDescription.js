import React, { Component } from 'react';

class AddARecipeDescription extends Component {
    render() {
        return (
            <div>
                <p>Describe your recipe here.</p>
                <textarea/>
                <button>Save Description</button>
            </div>
        );
    }
}

export default AddARecipeDescription;