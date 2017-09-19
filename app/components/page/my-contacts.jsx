import React from 'react';
import {render} from 'react-dom';
import {toast} from 'react-toastify';

import FetchContactsRequest from 'controller/fetch-contacts-request.js';
import DeleteContactsRequest from 'controller/delete-contacts-request.js';
import ContactsListPanel from 'comp/contacts-list-panel.jsx';
import AddContactPanel from 'comp/add-contact-panel.jsx';

class MyContacts extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      shouldDelete: false,
      activeContact: null,
      contacts: null
    }

    this.fetchContacts = this.fetchContacts.bind(this);
    this.handleContactDeleted = this.handleContactDeleted.bind(this);
  }

  componentDidMount() {
    setTimeout(this.fetchContacts, 1000);
  }

  fetchContacts(){
    new FetchContactsRequest(
      (result) => {

        if (result.success){

          this.setState({
            contacts: result.contacts
          });
      
        } else {

          toast.error("Server Error: Could not fetch contacts. Try again later.");

        }

      }, () => { 
        toast.error("Server Error: Could not fetch contacts. Try again later.");
    });
  }

  handleContactDeleted(id){
    new DeleteContactsRequest(id, 

      //On success 
      (response) => {

        this.fetchContacts();
        toast.success("Contact Deleted");

      },

      //On failure
      (response) => {

        toast.error(result.reason || "Server Error: Could not delete contact");

      });

  }

  render() {

    return (<div style={{ height: '100%' }}>

              
              <div style={ MyContacts.containerStyle }>

                
                <div style={{ flexGrow: ".1" }}>
                  <AddContactPanel  onSubmit={this.fetchContacts} 
                                    contact={this.state.activeContact} />
                </div>
                
                <div style={{ flexGrow: ".1" }}>
                  <ContactsListPanel  contacts={this.state.contacts} 
                                      onDelete={this.handleContactDeleted} />
                </div> 


              </div>
            
          
            </div>)
  
  }

}

MyContacts.containerStyle = {
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'center',
  width: '95%',
  height: ' calc(100% - 55px)',
  margin: 'auto'
}

export default MyContacts;