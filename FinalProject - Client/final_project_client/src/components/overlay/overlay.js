import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeNav } from '../../actions';

import './overlay.css';

const Overlay = ({ isOpen, closeNav }) => {
  return <div className={isOpen ? "overlay" + " " + "overlayOpen" : "overlay"} onClick={closeNav} />;
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.isNavOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ closeNav }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Overlay);
