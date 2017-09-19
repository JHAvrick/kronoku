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

                <div className="panel__content" style={{ height: '70%' }}>

                  <div className="panel__textbox hover--blue">
                    <h2 className="panel__subtitle"> {"1. Enter Your Number"} </h2>
                    <p className="panel__text"> 
                    { 
                      'Enter your number and click "Blacklist Me" to begin verification process. ' +
                      "You're number is NOT blacklisted until the verification is complete." 
                    } 
                    </p>
                  </div>

                  <div className="panel__textbox hover--purple">
                    <h2 className="panel__subtitle"> {"2. Verify Your Number"} </h2>
                    <p className="panel__text"> 
                    { 
                      "To verify that you are the owner of a number, you must enter " +
                      "a 6-digit code which will be sent to you via SMS." 
                    } 
                    </p>
                  </div>

                  <div className="panel__textbox hover--green">
                    <h2 className="panel__subtitle"> {"3. Your done!"} </h2>
                    <p className="panel__text"> 
                    { 
                      "A blacklisted number will never receive an SMS from Kronoku. " +
                      "To remove your number from the blacklist you'll have to shoot an email " +
                      "to support@kronoku.com."
                    } 
                    </p>
                  </div>

                </div>

            </Panel>)
  }

}

export default BlacklistInfoPanel;