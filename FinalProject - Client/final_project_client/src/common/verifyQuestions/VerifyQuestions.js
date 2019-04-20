import React, { Component } from 'react';
import StringUtil from '../../utils/StringUtil';

export default class VerifyQuestions extends Component {
    render() {
        const { handleInputChange, question1, question2, signUp, errors } = this.props;
        return (
            <div>
                {signUp && <div className="questionsContainer">
                    <span>Please answer the following questions:<br /></span>
                    <span>1)What is the name of your childhood street?*</span>
                    <input type="text" name="Question1" value={question1} onChange={handleInputChange} />
                    <span className="errorInput" > {errors["Question1"] && errors["Question1"]} </span>
                    <span><br />2)What was your mother's last name before marriage?*</span>
                    <input type="text" name="Question2" value={question2} onChange={handleInputChange} />
                    <span className="errorInput" > {errors["Question2"] && errors["Question2"]} </span>
                </div>}
            </div>
        );
    }

}