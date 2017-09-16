import React from 'react';
import PropTypes from 'prop-types';
import Panel from 'base/panel.jsx';
import ReactCodeInput from 'react-code-input';
import Transitional from 'base/transitional.jsx';

class VerifyPanel extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      reveal: false,
      showForm: props.showForm,
      pin: '0',
      onSubmit: props.onSubmit || function(){},
      onComplete: props.onComplete || function(){}
    }

    this.style = props.style;
    this.handlePINChange = this.handlePINChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTransitionExited = this.handleTransitionExited.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        reveal: true
      });
    }, 1);
  }

  handlePINChange(change){
    this.setState({
      pin: change
    }, () => {
      if (this.state.pin.length === 6){
        this.state.onComplete(this.state.pin)
      }
    });
  }

  handleSubmit(){
    this.state.onSubmit(this.state.pin);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      nextDisplayIsForm: nextProps.showForm,
      reveal: false,
    });
  }

  handleTransitionExited(){
    this.setState({
      showForm: this.state.nextDisplayIsForm,
      reveal: true,
    });
  }

  render() {
    const VerifyForm = (<div style={{ 
                          display: 'flex' ,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}>

                          <ReactCodeInput fields={6} 
                                          onChange={this.handlePINChange}
                                          inputStyle={{
                                            width: '30px',
                                            borderRadius: '3px',
                                            fontSize: '20px',
                                            height: '30px',
                                            border: '1px solid black',
                                            borderRadius: '3px',
                                            margin:  '4px',
                                            textAlign: 'center'
                                          }} />

                          <button onClick={ this.handleSubmit } 
                                  disabled={ this.state.pin.length < 6 ? true : false }
                                  className="button--dark"> {"Verify"} 
                          </button>

                        </div>)

    const IdleMessage = (<div style={{
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            color: '#636C72'
                          }}>

                            {"Submit your number above to begin verification."}

                          </div>)

    var activePanel = this.state.showForm ? VerifyForm : IdleMessage;
    return (<Panel className="panel" style={this.style} >

              <Transitional isActive={ this.state.reveal }
                            initial={{ position: 'relative', top: '-50px', opacity: '0', transition: '1s'}}
                            enter={{ transform: 'translate3d(0,0,0)', position: 'relative', top: '0px', opacity: '1', transition: '1s'}}
                            exit={{ transform: 'translate3d(0,0,0)', position: 'relative', top: '50px', opacity: '0', transition: '1s'}}
                            onExitComplete={this.handleTransitionExited} >

                { activePanel }

              </Transitional>            

            </Panel>)
  }

}

export default VerifyPanel;
