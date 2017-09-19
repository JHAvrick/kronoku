import React from 'react';
import {render} from 'react-dom';
import {toast} from 'react-toastify';

import DateSelect from 'base/date-select.jsx';
import DateSummary from 'base/date-summary.jsx';
import TimeSelect from 'base/time-select.jsx';
import RecipientsPanel from 'comp/recipients-panel.jsx';

import ReminderRequest from 'controller/reminder-request.js';

class SetReminder extends React.Component {
  constructor(props){
  	super(props);

    var now = new Date();
    this.state = {
      year: now.getFullYear(),
      month: now.getMonth(),
      day: now.getDate(),
      hour: now.getHours(),
      minute: now.getMinutes(),
      pm: now.getHours() > 12 ? true : false,
      recipients: [],
      message: '',
      reminderPending: false
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    //this.handleSMSChange = this.handleSMSChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        reveal: true
      });
    }, 1);
  }

  handleDateChange(change){
    this.setState({
      year: change.year,
      month: change.month,
      day: change.day
    });
  }

  handleTimeChange(change){
    this.setState({
      hour: change.hour,
      minute: change.minute,
      pm: change.pm
    });
  }

  /*
  handleSMSChange(change){
    this.setState({
      recipients: change.recipients,
      message: change.message
    });
  }
  */

  handleSubmit(reminder){

    this.setState({ 

      recipients: reminder.recipients,
      message: reminder.message,
      reminderPending: true

    }, ()=> {

      var request = new ReminderRequest(this.state, 
        //On success
        (result) => {

          this.setState({ reminderPending: false });

          if (result.success) toast.success("Reminder Created!");
          else toast.error(result.reason || "Error: Reminder Failed.");
            
        }, 
        //On Failure
        (result) => {

          this.setState({ reminderPending: false });

          toast.error("Error contacting server.");

        });

    });
  }

  render() {
    return (<div style={{ height: '100%' }}>

                <div style={{ display: 'flex', 
                              flexDirection: 'row', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              width: '95%',
                              height: ' calc(100% - 55px)',
                              margin: 'auto'
                            }}>

                  <div style={{ flexGrow: ".1" }}>
                    <DateSelect futureOnly={true} onChange={this.handleDateChange} />
                  </div>

                  <div style={{ flexGrow: ".1" }}>
                    <TimeSelect onChange={this.handleTimeChange} >
                      <DateSummary year={this.state.year}
                                   month={this.state.month}
                                   day={this.state.day}
                                   hour={this.state.hour}
                                   minute={this.state.minute}
                                   pm={this.state.pm} />
                    </TimeSelect>
                  </div>

                  <div style={{ flexGrow: ".1" }}>
                    <RecipientsPanel onSubmit={this.handleSubmit} disabled={this.state.reminderPending} />
                  </div>

                </div>

            </div>)
  }

}

export default SetReminder;