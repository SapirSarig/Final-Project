import React from 'react';
import YouTube from 'react-youtube';

import './mainVideo.css';

class MainVideo extends React.Component {
  render() {
    const opts = {
      playerVars: {
        autoplay: 1,
        showinfo: 0,
        color: 'white',
        origin: window.location.protocol + '//' + window.location.host,
      },
    };

    return (
      <div className="playerContainer">
        <YouTube className="mainVideo" videoId="aONFNpj3tac" opts={opts} />
      </div>
    );
  }
}

MainVideo.propTypes = {};

export default MainVideo;
