import React from 'react';
import {render} from 'react-dom';

import ExistingRequest from 'controller/existing-request.js';
import DeleteRequest from 'controller/delete-request.js';
import MyRemindersPanel from 'comp/my-reminders-panel.jsx';
import RemindersSummaryPanel from 'comp/reminders-summary-panel.jsx';
import NoRemindersPanel from 'comp/no-reminders-panel.jsx';
import NoRemindersInfoPanel from 'comp/no-reminders-info-panel.jsx';
import { ToastContainer, toast } from 'react-toastify';

class MyReminders extends React.Component {
  constructor(props){
  	super(props);

    this.refreshReminders = this.refreshReminders.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleReminderDeleted = this.handleReminderDeleted.bind(this);

    this.state = {
      noReminders: false,
      fetchComplete: false,
      reminders: [],
      activeReminder: {},
    }

    //Panels are only rendered once the initial fetch has completed
    this.refreshReminders(() => {
      this.setState({
        fetchComplete: true
      });
    });

  }

  handleSelectionChange(reminder){
    this.setState({
      activeReminder: reminder
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = false;
    switch(true){
      case (nextState.reminders !== this.state.reminders):
        shouldUpdate = true;
        break;
      case (nextState.fetchComplete !== this.state.fetchComplete):
        shouldUpdate = true;
        break;
      case (nextState.activeReminder !== this.state.activeReminder):
        shouldUpdate = true;
        break;
    }

    return shouldUpdate;
  }

  refreshReminders(onComplete){
    onComplete = onComplete ? onComplete : function(){}

    //-----------------------FETCH REMINDERS------------------------------------
    var reminders = new ExistingRequest((result) => {
      
      this.setState({
        noReminders: result.length === 0 ? true : false,
        reminders: result,
        activeReminder: result[0]
      }, () => {
        onComplete();
      });

    });
    //-------------------------------------------------------------------------    
  }

  handleReminderDeleted(){
    new DeleteRequest(this.state.activeReminder.reminder_id, 

      //On success 
      (response) => {

        this.refreshReminders();
        toast.success("Reminder Deleted");

      },

      //On failure
      (response) => {

        toast.error(result.reason || "Server Error: Could not delete reminder");

      })

  }

  render() {

    const panels = (<div style={{ height: '100%' }}>

                      <ToastContainer position="top-right"
                                      type="default"
                                      autoClose={5000}
                                      hideProgressBar={false}
                                      newestOnTop={false}
                                      closeOnClick
                                      pauseOnHover />

                        <div style={ MyReminders.containerStyle }>

                          <div style={{ flexGrow: ".1" }}>
                            <MyRemindersPanel onSelect={this.handleSelectionChange} reminders={this.state.reminders} />
                          </div>

                          <div style={{ flexGrow: ".1" }}>
                            <RemindersSummaryPanel reminder={this.state.activeReminder} onDeleted={ this.handleReminderDeleted } />
                          </div>

                        </div>
                    </div>)

    const noReminders = (<div style={{ height: '100%' }}> 
                          <div style={ MyReminders.containerStyle }>

                            <div style={{ flexGrow: ".1" }}>
                              <NoRemindersPanel />
                            </div>

                            <div style={{ flexGrow: ".1" }}>
                              <NoRemindersInfoPanel />  
                            </div>

                          </div>
                        </div>)

    const loading = (<div style={{ height: '100%' }}> 
                      <div style={ MyReminders.containerStyle }>
                        <div className="loader-pos">
                          <div className="loader"></div>
                        </div> 
                      </div>
                    </div>)

    return ( <div> 
                    { 
                      this.state.fetchComplete ? (this.state.noReminders ? noReminders : panels) : loading
                    } 
            </div> )
  
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