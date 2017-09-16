import React from 'react';
import PropTypes from 'prop-types';
import IosAlarm from 'react-icons/lib/io/ios-alarm.js';

class MyRemindersPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      reminders: props.reminders,
      selectedId: props.reminders[0].reminder_id,
      onSelect: props.onSelect || function(){}
    }    

    this.triggerOnSelect = this.triggerOnSelect.bind(this);
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var selectedId = nextProps.reminders === this.state.reminders 
                     ? this.state.selectedId 
                     : nextProps.reminders[0].reminder_id ;
    
    this.setState({
        reminders: nextProps.reminders,
        selectedId: selectedId 
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    var shouldUpdate = false;
    switch(true){
      case (nextProps.reminders !== this.state.reminders):
        shouldUpdate = true;
        break;
      case (nextState.selectedId !== this.state.selectedId):
        shouldUpdate = true;
        break;
    }

    return shouldUpdate;
  }

  handleSelectionChange(id){
    this.setState({
      selectedId: id
    }, () => {
      this.triggerOnSelect();
    });
  }

  triggerOnSelect(){

    for (var i = 0; i < this.state.reminders.length; i++){

      if (this.state.reminders[i].reminder_id === this.state.selectedId){

        this.state.onSelect(this.state.reminders[i]);

        return;
      }
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

              <div className="reminder-list--container">

                <div style={{ height: '100%', overflowY: 'auto' }}>

                  { 
                    this.state.reminders.map((reminder) => {

                      return <ReminderItem  isSelected ={ this.state.selectedId == reminder.reminder_id ? true : false }
                                            key={reminder.reminder_id}
                                            id={reminder.reminder_id}
                                            phone={reminder.phone}
                                            message={reminder.message}
                                            date={reminder.date_end} 
                                            onClick={ this.handleSelectionChange }/>

                    })
                  }

                </div>

              </div>

            </div>)
  }

}

class ReminderItem extends React.Component {
  constructor(props){
    super(props);

    this.formatPhone = this.formatPhone.bind(this);
    this.formatMessage = this.formatMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      id: props.id,
      isSelected: props.isSelected || false,
      phone: this.formatPhone(props.phone), //remove 1 from beginning and format
      message: this.formatMessage(props.message),
      date: new Date(props.date).toLocaleDateString(),
      onClick: props.onClick || function(){}
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isSelected: nextProps.isSelected
    });
  }

  handleClick(){
    this.state.onClick(this.state.id);
  }

  //CODE FROM HERE: https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
  formatPhone(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }

  formatMessage(message){
    if (message.length <= 15) return message;
    else return message.substring(0 , 15) + "...";
  }

  render() {
    return (<span className={ this.state.isSelected ? "reminder-list--item item-selected" : "reminder-list--item" }
                  onClick={this.handleClick} >
              <span className="col-left"> { this.state.phone } </span>
              <span className="col-center"> { this.state.message } </span>
              <span className="col-right"> { this.state.date } </span>
            </span>)
  }

}

export default MyRemindersPanel;