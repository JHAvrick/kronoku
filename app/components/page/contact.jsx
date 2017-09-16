import React from 'react';
import {render} from 'react-dom';

import ContactPanel from 'comp/contact-panel.jsx';

class Contact extends React.Component {
  constructor(props){
  	super(props);

    this.state = {}

  }

  render() {
    return (<div>
   
              <ContactPanel style={{
                height: '80%',
                margin: 'auto',
                width: '50%'
              }} />

            </div>)
  }

}

export default Contact;