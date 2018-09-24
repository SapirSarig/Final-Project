import React, { Component } from 'react';

import './interests.css';

class Interests extends Component {
    constructor(props) {
        super(props);
        this.focusElement = this.focusElement.bind(this);
        this.state = {
            otherDisabled: true
        }
    }


    focusElement(event) {
        const { handleInputChange } = this.props;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;
        let element = document.getElementById("OtherDetails");
        if (!target.checked) {
            element && (element.value = "");
            handleInputChange({ target: element});
        }
        const { otherDisabled } = this.state;
        this.setState({ otherDisabled: !target.checked });

    }

    render() {
        const { handleInputChange } = this.props;
        const { otherDisabled } = this.state;

        return (
            <div className="interestsContainer">
                <div>Interests</div>
                <div className="partOfInterests">
                    <div className="foodInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="1" id="checkboxFoodInput" name="" onChange={handleInputChange}/>
                            <label for="checkboxFoodInput"></label>
                        </div>
                        <div className="descTitle">Food</div>
                    </div>
                    <div className="sportInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="2" id="checkboxFSportInput" name="" onChange={handleInputChange}/>
                            <label for="checkboxFSportInput"></label>
                        </div>
                        <div className="descTitle">Sport</div>
                    </div>
                    <div className="styleInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="3" id="checkboxStyleInput" name="" onChange={handleInputChange}/>
                            <label for="checkboxStyleInput"></label>
                        </div>
                        <div className="descTitle">Style</div>
                    </div>
                    <div className="musicInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="4" id="checkboxMusicInput" name="" onChange={handleInputChange}/>
                            <label for="checkboxMusicInput"></label>
                        </div>
                        <div className="descTitle">Music</div>
                    </div>
                    <div className="technologyInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="5" id="checkboxTechnologyInput" name="" onChange={handleInputChange}/>
                            <label for="checkboxTechnologyInput"></label>
                        </div>
                        <div className="descTitle">Technology</div>
                    </div>
                    <div className="petsInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="6" id="checkboxPetsInput" name="" onChange={handleInputChange}/>
                            <label for="checkboxPetsInput"></label>
                        </div>
                        <div className="descTitle">Pets</div>
                    </div>
                    <div className="travelInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="7" id="checkboxTravelInput" name="" onChange={handleInputChange}/>
                            <label for="checkboxTravelInput"></label>
                        </div>
                        <div className="descTitle">Travel</div>
                    </div>
                    <div className="otherInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" value="8" id="checkboxOtherInput" name="Other" onChange={this.focusElement} />
                            <label for="checkboxOtherInput"></label>
                        </div>
                        <div className="descTitle">Other</div>
                        <input type="text" id="OtherDetails" className="otherInput" disabled={otherDisabled} name="Interests" onChange={handleInputChange}/>
                    </div>
                </div>
            </div>

            // <div className="Container">
            //     <span> Interests: </span>
            //     <span> Sport</span>
            //     <input type="checkbox" name="Interests" value="Sport" onChange={handleInputChange} />

            //     <span> Style </span>
            //     <input type="checkbox" name="Interests" value="Style" onChange={handleInputChange} />

            //     <span> Food</span>
            //     <input type="checkbox" name="Interests" value="Food" onChange={handleInputChange} />

            //     <span> Music</span>
            //     <input type="checkbox" name="Interests" value="Music" onChange={handleInputChange} />

            //     <span> Technology</span>
            //     <input type="checkbox" name="Interests" value="Technology" onChange={handleInputChange} />

            //     <span> Pets</span>
            //     <input type="checkbox" name="Interests" value="Pets" onChange={handleInputChange} />

            //     <span> Travel</span>
            //     <input type="checkbox" name="Interests" value="Travel" onChange={handleInputChange} />

            //     {/* how to save it in the server? */}
            //     <span>Other</span>
            //     <input type="checkbox" name="Other" onChange={this.focusElement} />
            //     <input id="OtherDetails" disabled={otherDisabled} type="text" name="Interests" onChange={handleInputChange} />
            // </div>
        )
    }
}

export default Interests;