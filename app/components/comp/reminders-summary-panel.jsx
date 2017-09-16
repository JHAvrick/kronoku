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

    this.formatPhone = this.formatPhone.bind(this);
    this.handleDeleteClicked = this.handleDeleteClicked.bind(this);

    this.state = {
      reminder: props.reminder,
      phone: this.formatPhone(props.reminder.phone),
      message: props.reminder.message,
      dateCreated: new Date(props.reminder.date_start).toLocaleDateString(),
      dateEnd: new Date(props.reminder.date_end).toLocaleDateString(),
      timeEnd: new Date(props.reminder.date_end).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
      onDeleted: props.onDeleted || function(){}
    }

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reminder){
      this.setState({ 
        reminder: nextProps.reminder,
        phone: this.formatPhone(nextProps.reminder.phone),
        message: nextProps.reminder.message,
        dateCreated: new Date(nextProps.reminder.date_start).toLocaleDateString(),
        dateEnd: new Date(nextProps.reminder.date_end).toLocaleDateString(),
        timeEnd: new Date(nextProps.reminder.date_end).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'})
      });
    }
  }

  formatPhone(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  handleDeleteClicked(){
    this.state.onDeleted();
  }

  render() {
    return (<div className="reminders-summary--container">

              <span className="reminders-summary--title">
                {" Reminder Info "}
                <Clipboard size={25} style={{ marginLeft: 'auto' }} />
              </span>

              <div className="container">
                <span style={{ display: 'flex', flexDirection: 'column', width: '100%', paddingLeft: '0' }}>  
                        <span className="blue"> <Calendar size={25} style={{marginRight: '15px'}} /> {this.state.dateEnd} </span>
                        <span className="purple"> <Clock size={25} style={{marginRight: '15px'}} /> {this.state.timeEnd} </span>
                        <span className="green"> <IosTelephone size={25} style={{marginRight: '15px'}} /> {this.state.phone} </span>
                        <span className="red"> <Chatbox size={25} style={{marginRight: '15px'}} /> {this.state.message} </span>
                </span>

                <span className="delete-reminder--container" onClick={ this.handleDeleteClicked }> 
                  <IosMinus size={50} />
                </span>

              </div>

            </div>)
  }

}

export default RemindersSummaryPanel;