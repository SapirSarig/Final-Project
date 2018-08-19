import React, { Component } from 'react';
import Home from '../../../components/home/Home';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (
            <div className="guestScreenWrapper">
                    <div className="siteHeader row align-items-center">
                        <div class="col-sm"> It's A Deal !! </div>
                    </div>
                    
                    <div className="row align-items-center">
                        <div class="col-sm">
                            Are you a star on social networks like Facebook or Instagram?<br></br>
                            Do you own a business and looking for an opportunity to sell your products?<br></br>
                            Use our website to connect with each other!
                        </div>
                    </div>
                    <div className="explanation row align-items-center">
                        <div class="col-sm">
                            <Home />
                        </div>
                        <div class="col-sm">
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/FlsCjmMhFmw" />
                        </div>
                    </div>

                {/* <Route exact path="/" component={App} /> */}
            </div>

        );
    }
}

export default HomePage;