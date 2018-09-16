import React, { Component } from 'react';

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
            <div className="Container">
                <span> Interests: </span>
                <span> Sport</span>
                <input type="checkbox" name="Interests" value="Sport" onChange={handleInputChange} />

                <span> Style </span>
                <input type="checkbox" name="Interests" value="Style" onChange={handleInputChange} />

                <span> Food</span>
                <input type="checkbox" name="Interests" value="Food" onChange={handleInputChange} />

                <span> Music</span>
                <input type="checkbox" name="Interests" value="Music" onChange={handleInputChange} />

                <span> Technology</span>
                <input type="checkbox" name="Interests" value="Technology" onChange={handleInputChange} />

                <span> Pets</span>
                <input type="checkbox" name="Interests" value="Pets" onChange={handleInputChange} />

                <span> Travel</span>
                <input type="checkbox" name="Interests" value="Travel" onChange={handleInputChange} />

                {/* how to save it in the server? */}
                <span>Other</span>
                <input type="checkbox" name="Other" onChange={this.focusElement} />
                <input id="OtherDetails" disabled={otherDisabled} type="text" name="Interests" onChange={handleInputChange} />
            </div>
        )
    }
}

export default Interests;