import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import Clipboard from 'react-icons/lib/io/clipboard.js';

class InfoPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}

    this.goToSetReminder = this.goToSetReminder.bind(this);
  }

  goToSetReminder(){
    window.location.hash = '#setreminder';
  }

  render() {
    return (<Panel className="panel" style={ this.props.style } >

                <h1 className="panel__title"> {"Kronoku"} 
                  <Clipboard size={30} style={{ marginLeft: 'auto' }}/>
                </h1>

                <div className="panel__content">

                  <div className="panel__textbox hover--blue">
                    <p className="panel__text">
                      { "Schedule quick and easy SMS reminders for yourself or a group!" }
                    </p>
                  </div>

                  <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '75%'
                  }}>

                    <button className="btn btn--50 btn--contrast btn--tall font--large" 
                            onClick={ this.goToSetReminder }> 

                            {"Set Reminder Now!"} 

                    </button>

                  </div>

                </div>

              </Panel>)
  }

}

export default InfoPanel;