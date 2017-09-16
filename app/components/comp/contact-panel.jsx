import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import Clipboard from 'react-icons/lib/io/clipboard.js';
import Email from 'react-icons/lib/io/email.js';

class ContactPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}
    this.style = props.style;
  }

  render() {
    return (<Panel className="panel" style={this.style}>

                <h1 className="panel__title"> {"Contact"} 
                  <Email size={30} style={{ marginLeft: 'auto' }}/>
                </h1>

              </Panel>)
  }

}

export default ContactPanel;