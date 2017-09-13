import React from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'base/phone-input.jsx';

class RecipientsForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      number: '',
      message: '',
      disabled: props.disabled,
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

  handleMessageChange(e){
    this.setState({
      message: e.target.value
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
                          placeholder="Your reminder here"
                          onChange={ this.handleMessageChange }>
                </textarea>
                <button disabled={this.state.disabled} className="button--submit-reminder" onClick={this.handleSubmit}> Set Reminder </button>
            </div>)
  }

}

RecipientsForm.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

RecipientsForm.defaultProps = {
  disabled: false,
  onChange: function(){},
  onSubmit: function(){}
}

export default RecipientsForm;