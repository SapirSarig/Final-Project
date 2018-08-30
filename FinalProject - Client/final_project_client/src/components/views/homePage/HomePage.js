import React, { Component } from 'react';
import Home from '../../../components/home/Home';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="guestScreenWrapper">
                    <div className="siteHeaderWrapper">
                        <div className="siteName"> It's A Deal !! </div>
                    </div>
                    
                    <div className="explanationWrapper">
                        <div class="explanation">
                            Are you a star on social networks like Facebook or Instagram?<br></br>
                            Do you own a business and looking for an opportunity to sell your products?<br></br>
                            Use our website to connect with each other!
                        </div>
                    </div>
                    <div className="homeWrapper">
                        <div className="home">
                            <Home />
                        </div>
                        <div className="video">
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/FlsCjmMhFmw" />
                        </div>
                    </div>

                {/* <Route exact path="/" component={App} /> */}
            </div>
        );
    }
}

export default HomePage;