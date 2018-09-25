import React, { Component } from 'react';

import './interests.css';

class Interests extends Component {
    constructor(props) {
        super(props);
        this.focusElement = this.focusElement.bind(this);
        this.state = {
            otherDisabled: true,
            otherValue: "",
            userInfo: {}
        }
        this.checkIfChecked = this.checkIfChecked.bind(this);
        this.getOtherValue = this.getOtherValue.bind(this);
        this.checkIfOtherChecked = this.checkIfOtherChecked.bind(this);
    }


    focusElement(event) {
        //const { handleInputChange } = this.props;
        const target = event.target;
        //const value = target.type === "checkbox" ? target.checked : target.value;
        //const name = target.name;
        // let element = document.getElementById("OtherDetails");
        //if (!target.checked) {
        //element && (element.value = "");
        //handleInputChange({ target: element});
        //}
        const { otherDisabled } = this.state;
        this.setState({ otherDisabled: !target.checked });

    }

    checkIfChecked(value) {
        const { interests } = this.props;
        if (interests) {
            for (var i = 0; i < interests.length; i++) {
                if (interests[i].Value === value) {
                    return true;
                }
            }

            return false;


        }

    }

    getOtherValue() {
        const { interests } = this.props;
        let { otherDisabled } = this.state;
        if (interests) {
            for (var i = 0; i < interests.length; i++) {
                if (interests[i].Value !== "Sport" && interests[i].Value !== "Style"
                    && interests[i].Value !== "Food" && interests[i].Value !== "Music"
                    && interests[i].Value !== "Technology" && interests[i].Value !== "Pets"
                    && interests[i].Value !== "Travel") {
                    return interests[i].Value;               
                }
            }
            return "";
        }
    }

    checkIfOtherChecked() {
        const { interests } = this.props;
        if (interests) {
            for (var i = 0; i < interests.length; i++) {
                if (interests[i].Value !== "Sport" && interests[i].Value !== "Style"
                    && interests[i].Value !== "Food" && interests[i].Value !== "Music"
                    && interests[i].Value !== "Technology" && interests[i].Value !== "Pets"
                    && interests[i].Value !== "Travel") {
                    return true;
                }
            }
            return false;
        }
    }

    render() {
        const { handleInputChange, interests, signUp } = this.props;
        const { otherDisabled } = this.state;

        return (
            <div className="interestsContainer">
                <div>Interests</div>
                <div className="partOfInterests">
                    <div className="foodInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" checked={this.checkIfChecked("Food")} value="Food" id="checkboxFoodInput" name="Interests" value="Food" onChange={handleInputChange}/>
                            <label for="checkboxFoodInput"></label>
                        </div>
                        <div className="descTitle">Food</div>
                    </div>
                    <div className="sportInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" checked={this.checkIfChecked("Sport")} name="Interests" value="Sport" id="checkboxFSportInput" onChange={handleInputChange}/>
                            <label for="checkboxFSportInput"></label>
                        </div>
                        <div className="descTitle">Sport</div>
                    </div>
                    <div className="styleInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" checked={this.checkIfChecked("Style")} name="Interests" value="Style" id="checkboxStyleInput" onChange={handleInputChange}/>
                            <label for="checkboxStyleInput"></label>
                        </div>
                        <div className="descTitle">Style</div>
                    </div>
                    <div className="musicInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" checked={this.checkIfChecked("Music")} name="Interests" value="Music" id="checkboxMusicInput" onChange={handleInputChange}/>
                            <label for="checkboxMusicInput"></label>
                        </div>
                        <div className="descTitle">Music</div>
                    </div>
                    <div className="technologyInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" checked={this.checkIfChecked("Technology")} name="Interests" value="Technology" id="checkboxTechnologyInput" onChange={handleInputChange}/>
                            <label for="checkboxTechnologyInput"></label>
                        </div>
                        <div className="descTitle">Technology</div>
                    </div>
                    <div className="petsInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox"  checked={this.checkIfChecked("Pets")} name="Interests" value="Pets" id="checkboxPetsInput" onChange={handleInputChange}/>
                            <label for="checkboxPetsInput"></label>
                        </div>
                        <div className="descTitle">Pets</div>
                    </div>
                    <div className="travelInterest interestWrapper">
                        <div className="checkboxforInterest">
                            <input type="checkbox" checked={this.checkIfChecked("Travel")} name="Interests" value="Travel" id="checkboxTravelInput" onChange={handleInputChange}/>
                            <label for="checkboxTravelInput"></label>
                        </div>
                        <div className="descTitle">Travel</div>
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