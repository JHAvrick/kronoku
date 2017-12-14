import React from 'react';
import {render} from 'react-dom';
import {toast} from 'react-toastify';

import FetchRemindersRequest from 'controller/fetch-reminders-request.js';
import DeleteRequest from 'controller/delete-request.js';
import RemindersListPanel from 'comp/reminders-list-panel.jsx';
import RemindersSummaryPanel from 'comp/reminders-summary-panel.jsx';

class MyReminders extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      shouldDelete: false,
      noReminders: false,
      reminders: null,
      activeReminder: null
    }

    this.fetchReminders = this.fetchReminders.bind(this);
    this.handleReminderSelected = this.handleReminderSelected.bind(this);
    this.handleReminderDeleted = this.handleReminderDeleted.bind(this);
  }

  componentDidMount() {
    setTimeout(this.fetchReminders, 1000);
  }

  fetchReminders(){
    new FetchRemindersRequest(
      (result) => {
        if (result.length > 0){
          this.setState({
            reminders: result,
            activeReminder: result[0],
            activeReminderId: result[0].id
          });
        } else {
          this.setState({
            reminders: result, //empty array
            activeReminder: null,
            activeReminderId: null
          });  
        }
      }, () => { 
        toast.error("Server Error: Could not fetch reminders. Try again later.");
    });
  }

  handleReminderSelected(id){
    this.setState({
      activeReminder: this.state.reminders.find(reminder => reminder.id === id),
      activeReminderId: id
    });
  }

  handleReminderDeleted(){
    new DeleteRequest(this.state.activeReminder.groupId, 

      //On success 
      (response) => {

        this.fetchReminders();
        toast.success("Reminder Deleted");

      },

      //On failure
      (response) => {

        toast.error(result.reason || "Server Error: Could not delete reminder");

      })

  }

  render() {

    return (<div style={{ height: '100%' }}>

              <div className="reflow">

                <div className="reflow__item">
                  <RemindersListPanel activeReminderId={this.state.activeReminderId} 
                                      reminders={this.state.reminders} 
                                      onSelect={this.handleReminderSelected} />
                </div>

                <div className="reflow__item">
                  <RemindersSummaryPanel onDeleted={this.handleReminderDeleted} reminder={this.state.activeReminder} />
                </div>

              </div>
          
            </div>)
  
  }

}

MyReminders.containerStyle = {
  display: 'flex', 
  flexDirection: 'row', 
  alignItems: 'center', 
  justifyContent: 'center',
  width: '95%',
  height: ' calc(100% - 55px)',
  margin: 'auto'
}

export default MyReminders;