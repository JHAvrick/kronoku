import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import InformationCircled from 'react-icons/lib/io/informatcircled.js';

class BlacklistInfoPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
    this.style = props.style;

  }

  render() {

    return (<Panel className="panel" style={ this.style } >

                <h1 className="panel__title"> { "Blacklist" } 
                  <InformationCircled size={30} style={{ marginLeft: 'auto' }}/>
                </h1>

                <div className="question-container container--blue">
                  <h2 className="panel__subtitle"> {" Check Your Status "} </h2>
                  <p className="panel__text"> { 'Enter your number and tap "Check Your Status" to see whether your number is already blacklisted or not.' } 
                  </p>
                </div>

                <div className="question-container container--purple">
                  <h2 className="panel__subtitle"> {" Verify Your Number "} </h2>
                  <p className="panel__text"> { "To verify that you are the owner of a number, you must enter  " 
                                              + "a 6-digit code which will be sent to you via SMS." } 
                  </p>
                </div>

                <div className="question-container container--green">
                  <h2 className="panel__subtitle"> {" Blacklist or Unblacklist Your Number "} </h2>
                  <p className="panel__text"> { "Once you've verified you're number you can blacklist or unblacklist your number. \n"  
                                              + "A blacklisted number will never be sent an SMS from Kronoku." } 
                  </p>
                </div>

            </Panel>)
  }

}

export default BlacklistInfoPanel;