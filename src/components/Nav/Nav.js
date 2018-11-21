import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/home">
      <h2 className="nav-title">막걸리</h2>
    </Link><br/>
    <div className="nav-right">
      <Link className="nav-link" to="/">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      <Link className="nav-link" to="/user">
          {props.user.id ? 'User Profile' : 'Login / Register'}
          </Link>
      {props.user.id && (
        <>
          <Link className="nav-link" to="/add-a-recipe">
            Add a Recipe
          </Link>
          <LogOutButton className="nav-link" to="/"></LogOutButton>
        </>
      )}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about">
        About
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
