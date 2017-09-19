import React from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';

import FetchContactsRequest from 'controller/fetch-contacts-request.js';
import ShadowMenu from 'base/shadow-menu.jsx';
import QuickContactPanel from 'comp/quick-contact-panel.jsx';
import Select from 'react-select';

class RecipientsForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      message: '', //the reminder text
      shadowMenuOpen: false, //whether the "Quick-Add Contact" menu is open
      selectedContacts: [], //The contacts that were selected upon submit
      contactOptions: [{ value: '+', label: '+ Add New Contact' }] //The contacts to choose from and "Add New" option
    }
    this.style = props.style;

    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleContactsChange = this.handleContactsChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleAddContact = this.handleAddContact.bind(this);
    this.handleCloseShadow = this.handleCloseShadow.bind(this);
    this.refreshContacts = this.refreshContacts.bind(this);
  }

  //Contacts are updated after the component mounts
  //This is just so I don't repeat a large block of code by putting it in the constructor, 
  //but can be used later if an async call becomes appropriate
  componentDidMount() {
    this.refreshContacts();
  }

  refreshContacts(){
    new FetchContactsRequest(
    (result) => {
      if (result.success){

        var contactOptions = result.contacts.map((contact) => {
          return { value: contact.contactId, label: contact.alias }
        }); 

        contactOptions.push({ value: '+', label: '+ Add New Contact' });

        this.setState({ contactOptions: contactOptions });

      } else {

        toast.error("Failed to fetch contacts. Try again later.");

      }
    }, 
    () => {

      toast.error("Server Error. Failed to fetch contacts.");

    });
  }

  handleMessageChange(e){
    this.setState({

      message: e.target.value

    }, ()=>{

      this.props.onChange({
        recipients: this.state.selectedContacts.map((contact) => { 
            return contact.value; //i.e. the contact ID
        }),
        //Also return the message body
        message: this.state.message
      });
      
    });
  }

  handleContactsChange(contacts){

    //Check if "+ New Contact" was selected, if so open the shadow-overlay menu
    if (contacts.filter(contact => contact.value == '+').length > 0){
      this.setState({ shadowMenuOpen: true });
    }

    var newContacts = contacts.filter(function (contact) {
        return contact.value != '+';
    });

    this.setState({ selectedContacts: newContacts });
  }

  handleAddContact(){
    this.setState({ shadowMenuOpen: false });
    this.refreshContacts();
  }

  handleCloseShadow(){
    this.setState({ shadowMenuOpen: false });
  }

  handleSubmit(){
    if (!this.validate()) return;

    this.props.onSubmit({
      //Return an array of contact numbers, names unecessary
      recipients: this.state.selectedContacts.map((contact) => { 
          return contact.value;
      }),
      //Also return the message body
      message: this.state.message
    });

  }

  validate(){
    //Check if any contacts have been selected
    if (this.state.selectedContacts.length === 0){
      toast.error("Please add at least one contact.")
      return false;
    }

    //Check if the string has only whitespace or not
    if (!/\S/.test(this.state.message)){
      toast.error("Please add a message.")
      return false;
    }

    return true;
  }

  render() {
    return (<div className="recipients__panel" style={this.style}>
                  
                <ShadowMenu isOpen={this.state.shadowMenuOpen}>
                  <QuickContactPanel  onSubmit={this.handleAddContact}
                                      onClose={this.handleCloseShadow}
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: '250px',
                                        height: '200px',
                                        position: 'absolute',
                                        top: '55%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        boxShadow: 'none'
                  }} />
                </ShadowMenu>

                <span className="recipients__label"> {" Recipients "} </span>

                <span className="recipients-form__container">
                  <Select
                    name="form-field-name"
                    value={this.state.selectedContacts}
                    placeholder="Select contacts..."
                    clearable={false}
                    multi={true}
                    options={this.state.contactOptions}
                    onChange={ this.handleContactsChange }
                  />
                </span>
                
                <span className="recipients__label"> {" Reminder "} </span>
                <textarea className="message-input" 
                          maxLength="150"
                          placeholder="Your message..."
                          onChange={ this.handleMessageChange }>
                </textarea>
                <button className="button--dark" style={{ width: '85%' }} onClick={this.handleSubmit}> Set Reminder </button>
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