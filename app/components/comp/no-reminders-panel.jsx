import React from 'react';
import PropTypes from 'prop-types';
import IosAlarm from 'react-icons/lib/io/ios-alarm.js';

class NoRemindersPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
    }    

  }

  render() {
    return (<div className="my-reminders--container">

              <span className="my-reminders--title">
                {" Your Reminders "}
                <IosAlarm size={25} style={{ marginLeft: 'auto' }} />
              </span>

              <span className="reminder-list--header">
                <span className="col-left"> { "Number" } </span>
                <span className="col-center"> { "Message" } </span>
                <span className="col-right"> { "Date" } </span>
              </span>
              
              <div className="reminder-list--container" style={{ textAlign: 'center' }}>

                <span style={{ display: 'inline-block', paddingTop: '25%', fontSize: '26px', color: 'lightgray' }}> 
                  { "¯\\_(ツ)_/¯" } 
                </span>

              </div>
            </div>)
  }

}

export default NoRemindersPanel;