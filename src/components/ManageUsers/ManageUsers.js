import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageUsers extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_ALL_USERS'})
    }

    render() {
        return (
            <div>
                {this.props.reduxState.admin.map((user, index) => (
                        <>
                        <tr key={index}>
                        <td><h1>{user.username}</h1></td><td><h1>{user.first_name}</h1></td><td><h1>{user.last_name}</h1></td>
                        <td><h1>{user.access_level}</h1></td><td><button>Delete User</button></td>
                        </tr>
                        </>
                    ))}
                <h1>Do something here!</h1>
                {JSON.stringify(this.props.reduxState.admin)}
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(ManageUsers);