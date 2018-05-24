import React, { Component } from 'react';
import Home from '../../../components/home/Home';
import './HomePage.css';

class HomePage extends Component {
    render() {
        return (

            <div className="guestScreenWrapper">
                    <div className="siteHeader"><h1> It's A Deal !! </h1></div>
                    <div>
                        Are you a star on social networks like Facebook or Instagram?<br></br>
                        Do you own a business and looking for an opportunity to sell your products?<br></br>
                        Use our website to connect with each other!
                             </div>
                    <div className="explanation">
                        <Home />
                        <div>
                            <iframe width="420" height="345" src="https://www.youtube.com/embed/FlsCjmMhFmw" />
                        </div>
                    </div>

                {/* <Route exact path="/" component={App} /> */}
            </div>

        );
    }
}

export default HomePage;