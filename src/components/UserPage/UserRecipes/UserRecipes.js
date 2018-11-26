import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserRecipes extends Component {
    render() {
        return (
            <div>
                {JSON.stringify(this.props.reduxState)}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(UserRecipes);