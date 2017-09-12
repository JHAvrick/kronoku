import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import InformationCircled from 'react-icons/lib/io/informatcircled.js';

class FaqPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}

    this.style = props.style;
  }

  render() {

    var blackListLink = <a href="#blacklist">here</a>;
    var reportAbuseLink = <a href="#contact">here</a>;

    return (<Panel className="panel" style={ this.style } >

                <h1 className="panel__title"> {"FAQ"} 
                  <InformationCircled size={30} style={{ marginLeft: 'auto' }}/>
                </h1>

                <div className="question-container container--blue">
                  <h2 className="panel__subtitle"> {"What is Kronoku?"} </h2>
                  <p className="panel__text"> { "Kronoku is a free web app that lets you schedule non-recurring SMS reminders " 
                                              + "for yourself or for a group." } 
                  </p>
                </div>

                <div className="question-container container--green">
                  <h2 className="panel__subtitle"> {"Why does it exist?"} </h2>
                  <p className="panel__text"> { "Kronoku is a personal project, built as an exercise to improve professiona skills. " +
                                                "There are other SMS reminder services (paid, mind you) that may better suit your " +
                                                "needs if you're looking for a fully featured personal or business solution." }
                  </p>
                </div>

                <div className="question-container container--purple">
                  <h2 className="panel__subtitle"> {"Why did I recieve an SMS from Kronoku?"} </h2>

                  <p className="panel__text">  Someone you know may have set a reminder for you. 
                                               If you recieved a message that you did not want,
                                               you can temporarily or permanently blacklist your
                                               number { blackListLink }. A blacklisted number will never 
                                               recieve an SMS text from Kronoku. You can also go { reportAbuseLink } to
                                               report abuse and I will do my best to resolve the issue. 
                  </p>
                  
                </div>

                <div className="question-container container--red">
                </div>

                <div className="question-container container--yellow">
                </div>

            </Panel>)
  }

}

export default FaqPanel;