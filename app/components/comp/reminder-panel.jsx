import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import DateMe from 'base/react-dateme.js';
import RecipientsForm from 'base/recipients-form.jsx';
import Clipboard from 'react-icons/lib/io/clipboard.js';

class ReminderPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
    this.style = props.style;
  }

  render() {
    return (<Panel className="panel" style={ this.style } >

                <h1 className="panel__title" style={{ fontSize: '24px' }}> {"Set Reminder"} 
                  <Clipboard size={30} style={{ marginLeft: 'auto' }}/>
                </h1>

                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '85%'
                }}>

                  <RecipientsForm style={{ marginRight: '15px' }} />
                  <DateMe futureOnly={true} />

                </div>

              </Panel>)
  }

}

export default ReminderPanel;