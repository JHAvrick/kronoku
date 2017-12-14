import React from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';

import CreateContactRequest from 'controller/create-contact-request.js';
import Panel from 'base/panel.jsx';
import PhoneInput from 'base/phone-input.jsx';
import CloseRound from 'react-icons/lib/io/close-round.js';

class QuickContactPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      number: '',
      name: ''
    }

    this.style = props.style;

    this.validate = this.validate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e){
    this.setState({
      name: e.target.value
    });
  }

  handleNumberChange(change){
    this.setState({
      number: change
    });
  }

  validate(){
    if (this.state.name == '' || this.state.number.length < 10){
      toast.error("Contacts must have a name and a complete number."); 
      return false;
    } 
    return true;
  }

  handleSubmit(){
    if (!this.validate()) return;

    new CreateContactRequest({ 
      alias: this.state.name, 
      phone: this.state.number }, 

      (results) => {

        if (results.success){

          toast.success("Contact Created"); 
          this.props.onSubmit();

        } else {

          toast.error(results.reason); 

        }

      }, () => {

        toast.error("Error Contacting Server"); 

    });

  }

  handleClose(){
  	this.props.onClose();
  }

  render() {
    return (<Panel className="panel" style={ this.style } >
              <div 	onClick={ this.handleClose }
			              style={{
			              	position: 'relative',
											top: '-5px',
											right: '-105px',
											color: 'gray',
											cursor: 'pointer'
             	}}>

    						<CloseRound size={20} />

    					</div>

    					<p style={{ marginTop:'0px', 
    											marginBottom: '30px', 
    											paddingBottom:'10px', 
    											borderBottom: '1px solid black',
    											fontSize: '18px'  }}> 
    						
    						Quick-Add Contact  

    					</p>

    					<div style={{ display: 'flex', flexDirection: 'column', width: '80%', height: '35%' }}>

              	<input onChange={this.handleNameChange} className="input input--full" placeholder="Name" type="text" />

	              <span className="quick-add-contact__inputs">
	                <PhoneInput className="phone-input recipients__phone-input" onChange={this.handleNumberChange} />
	                
	                <button className="recipients-form__submit"
	                				onClick={ this.handleSubmit }> 
	                + 

	                </button> 
	              </span>

              </div>
                  
            </Panel>)
  }


}

QuickContactPanel.propTypes = {
	onClose: PropTypes.func,
	onSubmit: PropTypes.func
}

QuickContactPanel.defaultProps = {
	onClose: function(){},
	onSubmit: function(){}
}


export default QuickContactPanel;