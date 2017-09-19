import React from 'react';
import PropTypes from 'prop-types';

class PreviousContactsPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {}    

  }

  render() {
    return (<div className="numbers--container">

                <div style={{ height: '100%', overflowY: 'auto' }}>

                  { 
                    this.props.contacts.map((reminder) => {

                      

                    });
                  }

                </div>



            </div>)
  }

}

class ContactItem extends React.Component {
  constructor(props){
    super(props);

    this.state = {}

  }

  //CODE FROM HERE: https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
  formatPhone(s) {
    var s2 = (""+s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
  }


  render() {
    return (<span>
                  
            </span>)
  }

}

export default PreviousContactsPanel;