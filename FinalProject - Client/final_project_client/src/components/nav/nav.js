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
  return bindActionCreators({ closeNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
