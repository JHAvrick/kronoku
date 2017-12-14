import React from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';

import Person from 'react-icons/lib/io/person.js';
import CreateContactRequest from 'controller/create-contact-request.js';
import PhoneInput from 'base/phone-input.jsx';

class AddContactPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      number: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.validate = this.validate.bind(this);

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

  render() {

    return (<div className="my-reminders--container">

              <span className="my-reminders--title" style={{ height: '20%' }}>
                {" Add Contact "}
                  <Person size={25} style={{ marginLeft: 'auto' }} /> 
              </span>

              <div className="panel__content panel__text" style={{ width: '85%', height: '50%' }}>

                {"Create a new contact below. Note that your contacts will be forgotten when you clear your browser's history."}

              </div>

              <div className="panel__content">

                <div style={{ display: 'flex', flexDirection: 'column', width: '250px', height: '70px' }}>

                  <input onChange={this.handleNameChange} className="input input--full" placeholder="Name" type="text" />

                  <span className="quick-add-contact__inputs">
                    <PhoneInput className="phone-input recipients__phone-input" onChange={this.handleNumberChange} />
                    
                    <button style={{ marginTop: '5px', height: '30px' }}
                            className="recipients-form__submit"
                            onClick={ this.handleSubmit }> 
                    + 

                    </button> 
                  </span>

                </div>

              </div>

            </div>)
  }

}

export default AddContactPanel;