import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './ManageUsers.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ManageUsers extends Component {

    state = {
        edit: true,
        user: {
          username: '',
          first_name: '',
          last_name: '',
          access_level: 0,
          id: 0,
        },
    }

    componentDidMount(){
        this.props.dispatch({type: 'FETCH_ALL_USERS'})
    }

    //handles the changes from the edit input field
 handleChange = (name) => (event) => {
    console.log('handleChange', name, event.target.value,)
    this.setState({
      ...this.state,
      updateUser: {...this.state.user, ...this.state.updateUser, [event.target.name]: event.target.value},
    })
  
  console.log(this.state)
 }
 
  //Gathers inputs and sends the PUT request to the database
  handleSave = (event) => {
    this.setState({ ...this.state,
      updateUser: '',
      user: '',
    });
    this.props.dispatch({type: 'EDIT_USER', payload: this.state.updateUser});
    console.log(this.state.user);
  }
 
  //Toggles the edit button to a save button
  handleEdit = (user) => () => {
    this.setState({
      ...this.state,
      user: user,
    });
    console.log(this.state.user);
  }
 
  //renders the edit/save button
  renderEditButton = (user) => {
    if(this.state.edit === true && this.state.user === user){
      return (
        <button className="borderless-btn" onClick={this.handleSave}>
        <FontAwesomeIcon icon="save" />
        </button>
      );
    }else{
        return(
          <button className="borderless-btn" onClick={this.handleEdit(user)}>
          <FontAwesomeIcon icon="edit" />
          </button>
          
      )
    }
  }

    render() {
        return (
            <div>
                <table className="admin-user-table">
                    <thead>
                        <tr>
                            <th>Username</th><th>First Name</th><th>Last Name</th><th>Access Level</th><th>Edit User</th><th>Delete User</th>
                        </tr>
                    </thead>
                    <tbody>
                {this.props.reduxState.admin.users.map((user, index) => (
                        <>
                        <tr key={index}>
                        {(this.state.edit === true && this.state.user !== user) ?
                        (<><td>{user.username}</td><td>{user.first_name}</td><td>{user.last_name}</td>
                        <td>{user.access_level}</td></>) : (<>
                        <td><input className="user-input" name="username" placeholder={user.username} onChange={this.handleChange("username")}/></td>
                        <td><input className="user-input" name="first_name" placeholder={user.first_name} onChange={this.handleChange("first_name")}/></td>
                        <td><input className="user-input" name="last_name" placeholder={user.last_name} onChange={this.handleChange("last_name")}/></td>
                        <td><input className="user-input" name="access_level" placeholder={user.access_level} onChange={this.handleChange("access_level")}/></td></>)}<td>{this.renderEditButton(user)}</td><td><button className="borderless-btn"><FontAwesomeIcon icon="trash" /></button></td>
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