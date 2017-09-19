import React from 'react';
import {render} from 'react-dom';
import {toast} from 'react-toastify';

import BlacklistInfoPanel from 'comp/blacklist-info-panel.jsx';
import BlacklistStatusPanel from 'comp/blacklist-status-panel.jsx';
import VerifyPanel from 'comp/verify-panel.jsx';
import BlacklistRequest from 'controller/blacklist-request.js';
import BlacklistVerifyRequest from 'controller/blacklist-verify-request.js';

class Blacklist extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      blacklistStaged: false,
      number: '0',
      pin: '0'
    }

    this.handlePhoneEntered = this.handlePhoneEntered.bind(this);
    this.handlePINEntered = this.handlePINEntered.bind(this);
    this.handleStageBlacklist = this.handleStageBlacklist.bind(this);
    this.handleVerifyBlacklist = this.handleVerifyBlacklist.bind(this);

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.blacklistStaged !== this.state.blacklistStaged) return true;
    else return false;
  }

  handlePhoneEntered(number){
    this.setState({
      number: number
    });
  }

  handlePINEntered(pin){
    this.setState({
      pin: pin
    });
  }

  handleStageBlacklist(number){
    new BlacklistRequest(number, 

      (response)=> {

        if (response.success){

          this.setState({ blacklistStaged: true });
          toast.success("You have been sent a verification code.");

        } else {
          toast.error(response.reason);
        }

      },
    
      (response) => {

        toast.error("Error contacting server. Try again later...?");

    });
  }

  handleVerifyBlacklist(number){
    new BlacklistVerifyRequest(this.state.number, this.state.pin, 

      (response)=> {

        if (response.success){

          this.setState({
            blacklistStaged: false,
            number: '0',
            pin: '0'
          });

          toast.success("Verified. This number has been added to the blacklist.");

        } else {
          toast.error(response.reason);
        }

      },
    
      (response) => {

        toast.error("Error contacting server. Try again later...?");

    });
  }

  render() {
    return (<div className="flex-centered" style={{ height: '90%' }}>
   
              <BlacklistInfoPanel style={{
                height: '80%'
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent:'space-between', width: '20%', height: '80%', marginLeft: '30px' }}>

                <BlacklistStatusPanel blacklistStaged={this.state.blacklistStaged} 
                                      onComplete={ this.handlePhoneEntered } 
                                      onSubmit={ this.handleStageBlacklist } 
                                      style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '48%',
                                        width: '100%'
                                      }} />

                <VerifyPanel  showForm={ this.state.blacklistStaged }
                              onComplete={ this.handlePINEntered } 
                              onSubmit={ this.handleVerifyBlacklist } 
                              style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '48%',
                                width: '100%'
                              }} />

              </div>

            </div>)
  }

}

export default Blacklist;