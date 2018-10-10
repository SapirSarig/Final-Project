import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { NavLink, withRouter } from 'react-router-dom';
import { closeNav } from '../../actions';

import './navMenuLink.css';

const NavMenuLink = ({ title, to, closeNav, isOpen }) => {
  return (
    <NavLink
      className={isOpen ? "navMenuLink" + " " + "open" : "navMenuLink"}
      onClick={() => closeNav()}
=======
import { NavLink } from 'react-router-dom';
import { closeNav } from '../../actions';
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import LocalStorageUtil from "../../utils/LocalStorageUtil";
import SessionStorageUtil from "../../utils/SessionStorageUtil";
import './navMenuLink.css';

const NavMenuLink = ({ title, to, closeNav, isOpen, logout }) => {
  return (
    <NavLink
      className={isOpen ? "navMenuLink" + " " + "open" : "navMenuLink"}
      onClick={() => {closeNav();

          if(logout === "true" ){
            LocalStorageUtil.RemoveLoggedUser();
            SessionStorageUtil.RemoveLoggedUser();
          }
        }
      }
>>>>>>> 9122ae5e55282d3f6d8232ba162eb2d086279d38
      activeClassName="linkActive"
      exact
      to={to}>
      {title}
    </NavLink>
  );
};

const mapStateToProps = (state) => {
    return {
      isOpen: state.isNavOpen,
    };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeNav }, dispatch);
};

<<<<<<< HEAD
export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavMenuLink)
);
=======
export default withRouter(connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavMenuLink));
>>>>>>> 9122ae5e55282d3f6d8232ba162eb2d086279d38
