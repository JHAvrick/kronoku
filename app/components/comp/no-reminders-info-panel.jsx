import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'react-icons/lib/io/clipboard.js';

class RemindersSummaryPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      reveal: false,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        reveal: true
      });
    }, 10);
  }

  render() {
    return (<div className="reminders-summary--container" s
                 tyle={ this.state.reveal ? {opacity: '1', transition: '.5s' } : {opacity: '0', transition: '.5s'} }>

              <span className="reminders-summary--title">
                {" Reminder Info "}
                <Clipboard size={25} style={{ marginLeft: 'auto' }} />
              </span>

              <div className="container">

                <span className="blue">

                  {" Kronoku couldn't find any reminders for you,"} <strong> { "but that doesn't mean they don't exist." } </strong>
                  {" Kronoku may have forgotten who you are if you've recently cleared your browser history/cookies." }
                  {" Any reminders you've set will still be delivered!" }

                </span>

              </div>

            </div>)
  }

}

export default RemindersSummaryPanel;