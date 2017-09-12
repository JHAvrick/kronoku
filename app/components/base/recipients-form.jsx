import React from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'base/phone-input.jsx';

class RecipientsForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      number: '',
      message: '',
      onChange: props.onChange,
      onSubmit: props.onSubmit
    }
    this.style = props.style;

    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNumberChange(change){
    this.setState({
      number: change
    }, ()=>{
      this.state.onChange({
        number: this.state.number,
        message: this.state.message
      })
    });
  }

  handleMessageChange(change){
    this.setState({
      message: change
    }, ()=>{
      this.state.onChange({
        number: this.state.number,
        message: this.state.message
      })
    });
  }

  handleSubmit(){
    this.state.onSubmit({
      number: this.state.number,
      message: this.state.message
    })
  }

  render() {
    return (<div className="recipients--container" style={this.style}>
                <span className="phone-input--container">
                  <PhoneInput onChange={this.handleNumberChange} />
                </span>
                <div>
                </div>
                <textarea className="message-input" 
                          maxLength="150"
                          placeholder="Your reminder here">
                </textarea>
                <button className="button--submit-reminder"> Set Reminder </button>
            </div>)
  }

}

RecipientsForm.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

RecipientsForm.defaultProps = {
  onChange: function(){},
  onSubmit: function(){}
}

export default RecipientsForm;