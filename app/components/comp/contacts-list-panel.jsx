import React from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';

import Person from 'react-icons/lib/io/person.js';
import IosTelephone from 'react-icons/lib/io/ios-telephone.js';
import IosMinus from 'react-icons/lib/io/ios-minus.js';

class ContactsListPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      activeDisplay: 'loading',
      contacts: props.contacts || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.contacts){

      if (nextProps.contacts.length > 0){

        this.setState({
          activeDisplay: 'list',
          contacts: nextProps.contacts
        });

      } else {

        this.setState({
          activeDisplay: 'empty',
          contacts: nextProps.contacts
        });
      }

    } else {

      this.setState({
        activeDisplay: 'loading'
      });

    }

  }

  handleItemClicked(id){
    this.props.onSelect(id);
  }

  render() {

    const loading = (<div style={{  display: 'flex', 
                                    justifyContent:'center', 
                                    alignItems:'center', 
                                    width:'100%', 
                                    height:'100%', 
                                    overflow:'hidden' }}>

                      <div className="loader">Loading...</div>

                    </div>)

    const empty = (<div style={{  display: 'flex', 
                                  justifyContent:'center', 
                                  alignItems:'center', 
                                  width:'100%', 
                                  height:'100%', 
                                  overflow:'hidden',
                                  fontSize: '32px',
                                  color: '#636C72' }}>
                    { "¯\\_(°_°)_/¯ \n\n" }
                  </div>)

    const list = (<div>{ 
                    this.state.contacts.map((contact) => {
                      return <ContactListCard    key={ contact.contactId }
                                                 id={ contact.contactId }
                                                 name={ contact.alias }
                                                 phone={ contact.phone }
                                                 onDelete={ this.props.onDelete } />
                    })
                  }</div>)

    const displays = {
      loading: loading,
      empty: empty,
      list: list
    }

    return (<div className="my-reminders--container" style={{ width: '400px' }}>

              <span className="my-reminders--title">
                {" Your Contacts "}
                  <Person size={25} style={{ marginLeft: 'auto' }} /> 
              </span>

              <div className="reminder-list__container">
                { displays[this.state.activeDisplay] }
              </div>

            </div>)
  }

}

class ContactListCard extends React.Component {
  constructor(props){
    super(props);

    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    this.formatPhone = this.formatPhone.bind(this); 
    this.state = {
      id: props.id,
      classUnselected: "list-card__container hover--purple",
      classSelected: "list-card__container hover--purple list-card--selected",
      name: props.name,
      phone: this.formatPhone(props.phone)
    }   

  }

  formatPhone(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  handleDeleteClicked(){
    this.props.onDelete(this.state.id);
  }

  render() {
    return (<div className="list-card__container hover--green">

              <div className="list-card__info-container">
                <span className="list-card__icon-container" 
                      style={{ height: '100%', 
                               flexDirection: 'column', 
                               padding: '0',
                               margin: '0'
                             }}>
                  
                  <div className="list-card__icon" style={{ margin: '10px auto 0px 15px' }}> 
                    <Person size={25} style={{ marginRight: '10px' }} /> { this.state.name }
                  </div>

                  <div className="list-card__icon" style={{ marginRight: 'auto', marginLeft: '15px' }}> 
                    <IosTelephone size={25} style={{ marginRight: '10px' }} /> { this.state.phone } 
                  </div>
                </span>
              </div>

              <div className="list-card__message-container" style={{ height: 'auto', alignItems: 'center' }}>
                
                <span className="button--delete" onClick={ this.handleDeleteClicked }> 
                  <IosMinus size={30} />
                </span>
                
              </div>
            </div>)
  }

}

ContactListCard.defaultProps = {
  onClick: function(){}
}


export default ContactsListPanel;