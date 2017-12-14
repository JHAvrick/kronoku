import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import PhoneInput from 'base/phone-input.jsx';

class BlacklistStatusPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
    	blacklistStaged: false,
    	buttonText: 'Blacklist Me',
    	number: 0,
    	allowSubmit: false,
    	onSubmit: props.onSubmit || function(){},
      onComplete: props.onComplete || function(){}
    }
    this.style = props.style;

    this.handleClick = this.handleClick.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    this.setState({
      blacklistStaged: nextProps.blacklistStaged || false
    }, () => {

      if (this.state.blacklistStaged)
        this.setState({buttonText: 'Resend Code'});

    });
  }

  handleNumberChange(newNumber){
  	this.setState({
  		number: newNumber,
  		allowSubmit: newNumber.length < 10 ? false : true
  	}, () => {

      if (this.state.number.length === 10){
        this.state.onComplete(this.state.number);
      }

    });
  }

  handleClick(){
  	this.state.onSubmit(this.state.number);
  }

  render() {

    return (<Panel className="panel" style={this.style} >

              <div className="flex--centered con--75 flex--col">

    					 <PhoneInput disabled={ this.state.blacklistStaged } onChange={this.handleNumberChange} />
    					
      					<button disabled={this.state.allowSubmit ? false : true} 
      									className="btn btn--dark btn--full font--med" 
      									onClick={ this.handleClick }> 

      									{this.state.buttonText} 

      					</button>

              </div>

            </Panel>)
  }

}

export default BlacklistStatusPanel;