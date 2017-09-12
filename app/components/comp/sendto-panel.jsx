import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import Clipboard from 'react-icons/lib/io/clipboard.js';

class SendToPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
    this.style = props.style;
  }

  render() {
    return (<Panel className="panel" style={ this.style } >

                <h1 className="panel__title"> {"To Whom"} 
                  <Clipboard size={30} style={{ marginLeft: 'auto' }}/>
                </h1>

                <div className="text-container container--blue">
                    <p className="panel__text"> { "Schedule quick and easy SMS reminders for yourself or a group!" } </p>
                </div>

              </Panel>)
  }

}

export default SendToPanel;