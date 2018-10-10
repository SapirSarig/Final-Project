import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

export default withRouter(connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavMenuLink));
