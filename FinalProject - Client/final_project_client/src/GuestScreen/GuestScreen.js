import React, { Component } from 'react';
import './GuestScreen.css';

class GuestScreen extends Component {

    render()
    {
        return(

            <div className = "gusetScreenWrapper">
                <div className="explanationWrapper">
                    <h1>
                        <span>It's</span><span>A</span><span>Deal</span>!!
                    </h1>
                    <div className="explanation">
                        jkhdfgjhglkhgkjgkrjgkrgjr
                        lkgjgkfjgkjgkfjgfkgjfkgjfk!
                    </div>
                    <iframe width="420" height="345" src="https://www.youtube.com/embed/FlsCjmMhFmw">
                    </iframe>
                    {/* <video width="320" height="240" controls> */}
                        {/* <source src="./../images/video1.mp4" type="video/mp4"/>                        
                        Your browser does not support the video tag.
                    </video> */}
                </div>
                
            </div>

        );
    }
}

export default GuestScreen;