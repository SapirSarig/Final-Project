import React, { Component } from 'react';

class Interests extends Component {

    render() {
        const {handleInputChange} = this.props;
        return (
            <div className="Container">
                <span> Interests: </span>
                <span> Sport</span>
                <input type="checkbox" name="Interests" value="Sport" onChange={handleInputChange} />

                <span> Clothing </span>
                <input type="checkbox" name="Interests" value="Clothing" onChange={handleInputChange} />

                <span> Food</span>
                <input type="checkbox" name="Interests" value="Food" onChange={handleInputChange} />

                <span> Music</span>
                <input type="checkbox" name="Interests" value="Music" onChange={handleInputChange} />
            </div>
        )
    }
}

export default Interests;