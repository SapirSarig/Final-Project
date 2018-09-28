import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import { closeNav } from '../../actions';

import './navMenuLink.css';

const NavMenuLink = ({ title, to, closeNav, isOpen }) => {
  return (
    <NavLink
      className={isOpen ? "navMenuLink" + " " + "open" : "navMenuLink"}
      onClick={() => closeNav()}
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

export default withRouter(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(NavMenuLink)
);
