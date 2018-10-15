import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './navToggle.css';
import { toggleNav } from '../../actions';

const NavToggle = ({ isNavOpen, toggleNav }) => {
  return (
    <div className="navToggle" onClick={toggleNav}>
      <div className={isNavOpen ? "barWrapper" + " " + "open" : "barWrapper"}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isNavOpen: state.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavToggle);
