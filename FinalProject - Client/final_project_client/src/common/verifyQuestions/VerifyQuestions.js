import React, { Component } from 'react';

export default class VerifyQuestions extends Component {
    render() {
        const { handleInputChange, question1, question2, signUp } = this.props;
        return (
            <div>
                {signUp && <div className="questionsContainer">
                    <span>Please answer the following questions:<br /></span>
                    <span>1)What is the name of your childhood street?*</span>
                    <input type="text" name="question1" value={question1} onChange={handleInputChange} />
                    <span><br />2)What is your mother's last name before marriage?*</span>
                    <input type="text" name="question2" value={question2} onChange={handleInputChange} />
                </div>}
            </div>
        );
    }

}