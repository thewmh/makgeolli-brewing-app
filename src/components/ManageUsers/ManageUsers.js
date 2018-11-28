import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageUsers extends Component {

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_ALL_USERS'})
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th><th>First Name</th><th>Last Name</th><th>Access Level</th><th>Edit User</th><th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                {this.props.reduxState.admin.map((user, index) => (
                        <>
                        <tr key={index}>
                        <td>{user.username}</td><td>{user.first_name}</td><td>{user.last_name}</td>
                        <td>{user.access_level}</td><td><button>Edit User</button></td><td><button>Delete User</button></td>
                        </tr>
                        </>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
  });

export default connect(mapStateToProps)(ManageUsers);