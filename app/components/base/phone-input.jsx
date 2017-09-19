import React from 'react';
import PropTypes from 'prop-types';

class PhoneInput extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      disabled: props.disabled || false,
      template: "(~0~1~2) - ~3~4~5 - ~6~7~8~9",
      currentValue: "(    )  -     -    ",
      className: props.className || "phone-input",
      onChange: props.onChange
    }

    this.setInputRef = this.setInputRef.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleCursorMove = this.handleCursorMove.bind(this);
  } 

  handleInput(e){
    //Replace all non-digit characters w/ nothing AND force only 10 digits max
    var number = e.target.value.replace(/\D/g, '').substring(0,10);

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

  componentWillReceiveProps(nextProps) {
    this.setState({
      disabled: nextProps.disabled || false
    });
  }

  render() {
    return (<input className={ this.state.className }
                   placeholder="Number"
                   ref={ this.setInputRef } 
                   value={  
                            this.state.currentValue.replace(/\D/g, '').length > 0 
                            ? this.state.currentValue 
                            : '' 
                          } 
                   onInput={ this.handleInput }
                   onClick={ this.handleCursorMove }
                   onKeyDown={ this.handleCursorMove } 
                   disabled={this.state.disabled} />)
  }

}

PhoneInput.propTypes = {
  onChange: PropTypes.func
}

PhoneInput.defaultProps = {
  onChange: function(){}
}

export default PhoneInput;