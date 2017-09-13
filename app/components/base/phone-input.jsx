import React from 'react';
import PropTypes from 'prop-types';

class PhoneInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      template: "(~0~1~2) - ~3~4~5 - ~6~7~8~9",
      currentValue: "(###) - ### - ####",
      onChange: props.onChange
    }

    this.setInputRef = this.setInputRef.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCursorMove = this.handleCursorMove.bind(this);
  } 

  handleInput(e){
    //Replace all non-digit characters w/ nothing
    var number = e.target.value.replace(/\D/g, '');

    var newValue = this.state.template; //Get the template from state
    for (var i = 0; i < number.length; i++){
      var newValue = newValue.replace('~' + i, number[i]); //replace template characters based on index 
    }

    var newValue = newValue.replace(/[~][0-9]/g, '#'); //replace any remaining template chars w/ pound symbol
    var cursorIndex = newValue.lastIndexOf(number[number.length - 1]) + 1; //set cursor position to just after last-entered digit

    this.setState({
      currentValue: newValue
    }, ()=> {
      this.inputRef.setSelectionRange(cursorIndex, cursorIndex); //update cursor position
    });

    this.state.onChange(number); //only report raw number value to callback
  }

  handleCursorMove(){
    var number = this.state.currentValue.replace(/\D/g, '');
    var cursorIndex = this.state.currentValue.lastIndexOf(number[number.length - 1]) + 1;
    this.inputRef.setSelectionRange(cursorIndex, cursorIndex);

    this.state.onChange(this.inputRef.value.replace(/\D/g, ''));
  }

  setInputRef(ref){
    this.inputRef = ref;
  }

  render() {
    return (<input className="phone-input"
                   ref={ this.setInputRef } 
                   value={ this.state.currentValue } 
                   onInput={ this.handleInput }
                   onClick={ this.handleCursorMove }
                   onKeyDown={ this.handleCursorMove } />)
  }

}

PhoneInput.propTypes = {
  onChange: PropTypes.func
}

PhoneInput.defaultProps = {
  onChange: function(){}
}

export default PhoneInput;