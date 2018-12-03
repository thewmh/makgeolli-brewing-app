import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';

const Nav = (props) => (
  <div className="nav">
    <Link to="/" activeClassName="active-link">
      {/* <h2 className="nav-title">막걸리</h2> */}
      <img src="./mak-logo-b.png" alt="막" className="막"/>
    </Link><br/>
    <div className="nav-right">
      <Link className="nav-link" to="/" activeClassName="active-link">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        Recipe Gallery
      </Link>
      {/* Show the link to the info page and the logout button if the user is logged in */}
      <Link className="nav-link" to="/user" activeClassName="active-link">
          {props.user.user_id ? 'User Profile' : 'Login / Register'}
          </Link>
      {(props.user.access_level <= 2) ?
      (<>
      <Link className="nav-link" to="/add-a-recipe" activeClassName="active-link">
      Add a Recipe
      </Link>
      </>
      ) : (<></>)}
      {(props.user.access_level === 1) ?
      (<>
      <Link className="nav-link" to="/admin/manage-users" activeClassName="active-link">
      Manage Users
      </Link>
      <Link className="nav-link" to="/admin/manage-recipes" activeClassName="active-link">
      Manage Recipes
      </Link>
      </>
      ) : (<></>)}
      {/* Always show this link since the about page is not protected */}
      <Link className="nav-link" to="/about" activeClassName="active-link">
        About
      </Link>
      {props.user.user_id && (
        <>
          <LogOutButton className="nav-link" to="/"></LogOutButton>
        </>
      )}
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
  userProfile: state.user.userProfile
});

export default connect(mapStateToProps)(Nav);
