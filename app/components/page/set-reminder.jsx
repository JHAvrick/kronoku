import React from 'react';
import {render} from 'react-dom';

import DateSelect from 'base/date-select.jsx';
import DateSummary from 'base/date-summary.jsx';
import TimeSelect from 'base/time-select.jsx';
import RecipientsForm from 'base/recipients-form.jsx';


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
      pm: now.getHours() > 12 ? true : false
    }

    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);

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
                    <RecipientsForm />
                  </div>

                </div>

            </div>)
  }

}

export default SetReminder;