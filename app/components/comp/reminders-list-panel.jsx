import React from 'react';
import PropTypes from 'prop-types';
import {toast} from 'react-toastify';

import IosAlarm from 'react-icons/lib/io/ios-alarm.js';
import Person from 'react-icons/lib/io/person.js';
import Calendar from 'react-icons/lib/io/calendar.js';
import Clock from 'react-icons/lib/io/clock.js';
import Chatbox from 'react-icons/lib/io/chatbox.js';

import FetchRemindersRequest from 'controller/fetch-reminders-request.js';

class RemindersListPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      activeDisplay: 'loading',
      activeReminderId: 0,
      reminders: []
    }

    this.handleItemClicked = this.handleItemClicked.bind(this);
    //this.fetchReminders = this.fetchReminders.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.reminders){

      if (nextProps.reminders.length > 0){

        this.setState({
          activeDisplay: 'list',
          selectedItemID: nextProps.reminders[0].id,
          reminders: nextProps.reminders
        });

      } else {

        this.setState({
          activeDisplay: 'empty',
          selectedItemID: nextProps.reminders[0],
          reminders: nextProps.reminders
        });
      }

    } else {

      this.setState({
        activeDisplay: 'loading'
      });

    }

    if (nextProps.activeReminderId){
      this.setState({
        activeReminderId: nextProps.activeReminderId
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
                    { "¯\\_(ツ)_/¯ \n\n" }
                  </div>)

    const list = (<div>{ 
                    this.state.reminders.map((reminder) => {
                      return <RemindersListCard  isSelected = { this.state.activeReminderId === reminder.id
                                                                ? true 
                                                                : false 
                                                              }

                                                 key={ reminder.id }
                                                 id={ reminder.id }
                                                 contacts={ reminder.contacts }
                                                 message={ reminder.message }
                                                 dateCreated={ reminder.dateStart } 
                                                 dateEnd={ reminder.dateEnd } 
                                                 onClick={ this.handleItemClicked }/>
                    })
                  }</div>)

    const displays = {
      loading: loading,
      empty: empty,
      list: list
    }

    return (<div className="my-reminders--container">

              <span className="my-reminders--title">
                {" Your Reminders "}
                <IosAlarm size={25} style={{ marginLeft: 'auto' }} />
              </span>

              <div className="reminder-list__container">
                { displays[this.state.activeDisplay] }
              </div>

            </div>)
  }

}

class RemindersListCard extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.formatMessage = this.formatMessage.bind(this); 
    this.state = {
      classUnselected: "list-card__container hover--purple",
      classSelected: "list-card__container hover--purple list-card--selected",
      recipientCount: props.contacts.length,
      scheduled: new Date(props.dateEnd).toLocaleDateString(),
      time: new Date(props.dateEnd).toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'}),
      message: this.formatMessage(props.message)
    }   

  }

  handleClick(){
    this.props.onClick(this.props.id);
  }

  formatMessage(message){
    if (message.length > 60)
      return '"' + message.substring(0, 60) + '..."';
    else
      return '"' + message + '"';
  }

  render() {
    return (<div className={ this.props.isSelected ? this.state.classSelected : this.state.classUnselected }
                 onClick={this.handleClick}>

              <div className="list-card__info-container">
                <span className="list-card__icon-container">
                  
                  <div className="list-card__icon"> 
                    <Person size={25} />
                  </div>

                  <div className="list-card__icon collapse--small"> 
                    <Calendar size={25} />
                  </div>

                  <div className="list-card__icon"> 
                    <Clock size={25} />
                  </div>

                </span>
                <div className="list-card__recipients-count">

                  <div className="list-card__info-label"> 
                    { this.state.recipientCount  }
                  </div>

                  <div className="list-card__info-label collapse--small"> 
                    { this.state.scheduled }
                  </div>

                  <div className="list-card__info-label"> 
                    { this.state.time }
                  </div>

                </div>
              </div>

              <div className="list-card__message-container">
                { this.state.message }
              </div>

            </div>)
  }

}

RemindersListCard.defaultProps = {
  onClick: function(){}
}


export default RemindersListPanel;