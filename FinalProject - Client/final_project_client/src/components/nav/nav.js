<<<<<<< HEAD
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import { closeNav } from '../../actions';
import NavMenu from './navMenu';
import './nav.css';

const Nav = ({ isOpen, closeNav }) => {
  return (
    <aside className={isOpen ? "nav" + " " + "navOpen" : "nav"}>
      <NavMenu />
    </aside>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
=======
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { BrowserRouter as Router, NavLink  } from "react-router-dom";

import { closeNav } from "../../actions";
import NavMenu from "./navMenu";
import "./nav.css";

const Nav = ({ isOpen, closeNav }) => {
  return (
      <aside className={isOpen ? "nav" + " " + "navOpen" : "nav"}>
        <NavMenu />
      </aside>
  );
};

const mapStateToProps = state => {
  return {
    isOpen: state.isNavOpen
  };
};

const mapDispatchToProps = dispatch => {
>>>>>>> 9122ae5e55282d3f6d8232ba162eb2d086279d38
  return bindActionCreators({ closeNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
