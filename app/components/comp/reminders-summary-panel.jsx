import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'react-icons/lib/io/clipboard.js';
import Calendar from 'react-icons/lib/io/calendar.js';
import Clock from 'react-icons/lib/io/clock.js';
import IosTelephone from 'react-icons/lib/io/ios-telephone.js';
import IosMinus from 'react-icons/lib/io/ios-minus.js';
import Chatbox from 'react-icons/lib/io/chatbox.js';

class RemindersSummaryPanel extends React.Component {
  constructor(props){
    super(props);

    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);
    this.state = {
      empty: true,
      reminder: "Loading...",
      contacts: null,
      message: "Loading...",
      dateCreated: "Loading...",
      dateEnd: "Loading...",
      timeEnd: "Loading..."
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reminder){

      this.setState({ 
        empty: false,
        reminder: nextProps.reminder,
        contacts: nextProps.reminder.contacts,
        message: nextProps.reminder.message,
        dateCreated: new Date(nextProps.reminder.dateCreated).toLocaleDateString(),
        dateEnd: new Date(nextProps.reminder.dateEnd).toLocaleDateString(),
        timeEnd: new Date(nextProps.reminder.dateEnd).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
      });

    } else {

      this.setState({empty: true});

    }
  }

  handleDeleteClicked(){
    this.props.onDeleted();
  }

  render() {

    const empty = (<div className="reminders-summary--container">

                    <p style={{ textAlign: 'center' }}> <strong>  
                      {"No reminders found, but that doesn't mean they don't exist! \n\n"}
                    </strong> </p>

                    <p style={{ textAlign: 'center' }}>  
                      {"Kronoku may have forgotten who you are if your browser history was recently cleared. "}
                      {"Any outstanding reminders will still be delivered."}
                    </p>


                  </div>)

    const summary = (<div className="reminders-summary--container">

                      <span className="reminders-summary--title">
                        {" Reminder Info "}
                        <Clipboard size={25} style={{ marginLeft: 'auto' }} />
                      </span>

                      <div className="container">
                        <span style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: '0' }}>  
                                <span className="hover--blue"> <Calendar size={25} style={{marginRight: '15px'}} /> {this.state.dateEnd} </span>
                                <span className="hover--purple"> <Clock size={25} style={{marginRight: '15px'}} /> {this.state.timeEnd} </span>
                                <span style={{ 
                                  display: 'inline-block',
                                  marginRight: '15px'
                                }}> 

                                  <IosTelephone size={25} style={{ paddingRight: '10px' }} /> 

                                  { 
                                    this.state.contacts ? 
                                    this.state.contacts.map((contact) => {
                                      return <ContactPill key={contact.phone} number={contact.phone} name={contact.name} />
                                    })
                                    : ""
                                  }

                                </span>                 
                                <span className="hover--red"> <Chatbox size={22} style={{marginRight: '15px', whiteSpace: 'pre-wrap' }} /> {this.state.message} </span>
                        </span>

                        <span className="button--delete" style={{ margin: 'auto' }} onClick={this.handleDeleteClicked}> 
                          <IosMinus size={50} />
                        </span>

                      </div>

                    </div>)

    return this.state.empty ? empty : summary
  }

}

class ContactPill extends React.Component {
  constructor(props){
    super(props);

    this.goToContacts = this.goToContacts.bind(this);
    this.handleUnhover = this.handleUnhover.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.formatPhone = this.formatPhone.bind(this);
    this.state = {
      number: this.formatPhone(props.number),
      name: props.name,
      display: props.name
    }

  }

  formatPhone(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  handleHover(){
    /*
    this.setState({
      display: this.state.number
    });
    */
  }

  handleUnhover(){
    /*
    this.setState({
      display: this.state.name
    });
    */
  }

  goToContacts(){
    window.location.hash = '#mycontacts';
  }

  render() {
    return (<div  onClick={this.goToContacts}
                  onMouseOver={this.handleHover} 
                  onMouseOut={this.handleUnhover}
                  style={{
                    display: 'inline-block',
                    padding: '5px',
                    margin: '3px',
                    width: 'auto',
                    height: '20px',
                    borderRadius: '5px',
                    backgroundColor: '#EEEEEE',
                    color: '#A2A2A2',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: '.5s'
                  }}>

              { this.state.display }

            </div>)
  }

}

export default RemindersSummaryPanel;