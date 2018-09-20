import React, { Component } from 'react';

class Interests extends Component {
    constructor(props) {
        super(props);
        this.focusElement = this.focusElement.bind(this);
        this.state = {
            otherDisabled: true,
            otherValue:"",
            userInfo :
            {
                Name: "rinat",
                Email: "rinat@gmail.com",
                ConfirmEmail: "rinat@gmail.com",
                Picture: "string",
                Description: "pop",
                Type: "Business Owner",
                CompanyName: "cola",
                LinkToCompanySite: "www.walla.com",
                socialNetworks: [
                    {
                        Value: "Facebook",
                        LinkToProfile: "www.Facebook.com"
                    }
                ],
                Interests: [
                    {
                        value: "Sport"
                    },
                    {
                        value: "Music"
                    },
                    {
                        other:"Kaka"
                    }
                ]

            }
        }
        this.checkIfChecked = this.checkIfChecked.bind(this);
        this.getOtherValue = this.getOtherValue.bind(this);
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

    checkIfChecked(value){
        //const {interests} = this.props;
        const {userInfo} = this.state;
        const interests = userInfo.Interests;
        if(interests){
            for(var i=0; i<interests.length; i++){
                if (interests[i].value === value){
                    return true;
                }
            }
            return false;
        }
        
    }

    getOtherValue(){
        // const {userInfo} = this.state;
        // const interests = userInfo.Interests;
        // if (userInfo){
        //     for(var i=0; i<interests.length; i++){
        //         if ((Object.keys(interests[i]).includes("other"))){
        //             return true;
        //         }
        //     }
        //     return false;
        // }
    }

    render() {
        const { handleInputChange } = this.props;
        const { otherDisabled } = this.state;


        return (
            <div className="Container">
                <span> Interests: </span>
                <span> Sport</span>
                <input type="checkbox" checked={this.checkIfChecked("Sport")} name="Interests" value="Sport" onChange={handleInputChange} />

                <span> Style </span>
                <input type="checkbox" checked={this.checkIfChecked("Style")} name="Interests" value="Style" onChange={handleInputChange} />

                <span> Food</span>
                <input type="checkbox" checked={this.checkIfChecked("Food")} name="Interests" value="Food" onChange={handleInputChange} />

                <span> Music</span>
                <input type="checkbox" checked={this.checkIfChecked("Music")} name="Interests" value="Music" onChange={handleInputChange} />

                <span> Technology</span>
                <input type="checkbox" checked={this.checkIfChecked("Technology")} name="Interests" value="Technology" onChange={handleInputChange} />

                <span> Pets</span>
                <input type="checkbox" checked={this.checkIfChecked("Pets")} name="Interests" value="Pets" onChange={handleInputChange} />

                <span> Travel</span>
                <input type="checkbox" checked={this.checkIfChecked("Travel")} name="Interests" value="Travel" onChange={handleInputChange} />

                {/* how to save it in the server? */}
                <span>Other</span>
                <input type="checkbox" name="Other" onChange={this.focusElement} />
                <input id="OtherDetails" value={this.getOtherValue} disabled={otherDisabled} type="text" name="Interests" onChange={handleInputChange} />
            </div>
        )
    }
}

export default Interests;