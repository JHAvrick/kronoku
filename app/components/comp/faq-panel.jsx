import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import InformationCircled from 'react-icons/lib/io/informatcircled.js';

class FaqPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
  }

  render() {

    var blackListLink = <a href="#blacklist">here</a>;

    return (<Panel className="panel" style={ this.props.style } >

                <h1 className="panel__title"> {"FAQ"} 
                  <InformationCircled size={30} style={{ marginLeft: 'auto' }}/>
                </h1>

                <div className="panel__content">

                  <div className="panel__textbox hover--blue">
                    <h2 className="panel__subtitle"> {"What is Kronoku?"} </h2>
                    <p className="panel__text"> 
                      { 
                        "Kronoku is a free web app that lets you schedule non-recurring SMS reminders " +
                        "for yourself or for a group." 
                      } 
                    </p>
                  </div>

                  <div className="panel__textbox hover--green">
                    <h2 className="panel__subtitle"> {"Why does it exist?"} </h2>
                    <p className="panel__text"> 
                      { 
                        "Kronoku is a personal project, built as an exercise to improve professional skills. " +
                        "There are other SMS reminder services (paid, mind you) that may better suit your " +
                        "needs if you're looking for a fully featured personal or business solution." 
                      }
                    </p>
                  </div>

                  <div className="panel__textbox hover--purple">
                    <h2 className="panel__subtitle"> {"Why did I recieve an SMS from Kronoku?"} </h2>

                    <p className="panel__text">  
                        Someone you know may have set a reminder for you. 
                        If you recieved a message that you did not want,
                        you can temporarily or permanently blacklist your
                        number { blackListLink }. A blacklisted number will never 
                        recieve an SMS text from Kronoku.
                    </p>
                    
                  </div>

                  <div className="panel__textbox hover--yellow">
                    <h2 className="panel__subtitle"> {"Where did my reminders go?"} </h2>

                    <p className="panel__text">  
                      {
                        "Kronoku may have forgotten who you are if you recently cleared your " +
                        "browser history or if you're using a different browser than was used to set " +
                        "the reminders. Any existing reminders will still be delivered!"
                      }
                    </p>
                  </div>

                  <div className="panel__textbox hover--red">
                    <h2 className="panel__subtitle"> {"How can I contact you?"} </h2>

                    <p className="panel__text">  
                      {
                        "Send an email to contact@kronoku.com. If you have an " + 
                        "issue or would like to report abuse, your can use" +
                        "support@kronoku.com"
                      }
                    </p>
                  </div>

                </div>

            </Panel>)
  }

}

export default FaqPanel;