import React from 'react';
import PropTypes from 'prop-types';

class Transitional extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      //state details
      initial: props.initial,
      enter: props.enter,
      exit: props.exit,

      //state flags
      isActive: false,
      isEntered: false,
      activeTransitionTime: parseFloat(props.initial.transition),
      transitionState: props.initial,

      //Transition callbacks
      onEnterComplete: props.onEnterComplete,
      onExitComplete: props.onExitComplete,
      onTransitionComplete: props.onTransitionComplete
    }

    this.callEnterComplete = this.callEnterComplete.bind(this);
    this.callExitComplete = this.callExitComplete.bind(this);
  }

  callEnterComplete(){
    setTimeout(() => {
      this.state.onEnterComplete();
      this.state.onTransitionComplete();
    }, this.state.activeTransitionTime * 1000);
  }

  callExitComplete(){
    setTimeout(() => {
      this.setState({ transitionState: this.state.initial });
      this.state.onExitComplete();
      this.state.onTransitionComplete();
    }, this.state.activeTransitionTime * 1000);
  }

  componentWillReceiveProps(nextProps) {

    //not currently active, prop signals true to enter
    if (!this.state.isEntered && nextProps.isActive){

      var isEntered = true;
      var transitionState = this.state.enter;

      this.callEnterComplete();

    //currently active, prop signals false to exit
    } else if (this.state.isEntered && !nextProps.isActive){

      var isEntered = false;
      var transitionState = this.state.exit; 

      this.callExitComplete();

    //no state change, not sure if this is ever reached
    } else {

      var isEntered = this.state.isEntered;
      var transitionState = this.state.transitionState;

    }

    this.setState({
      isActive: nextProps.isActive,
      isEntered: isEntered,
      transitionState: transitionState,
      activeTransitionTime: parseFloat(transitionState.transition)
    });

  }

  render() {
    return (<div style={ this.state.transitionState }>
              { this.props.children }
            </div>)
  }

}

//Defaults
Transitional.propTypes = {
  initial: PropTypes.object,
  enter: PropTypes.object,
  exit: PropTypes.object,
  isActive: PropTypes.bool,
  onEnterComplete: PropTypes.func,
  onExitComplete: PropTypes.func,
  onTransitionComplete: PropTypes.func
};

Transitional.defaultProps = {
  initial: { opacity: 0, transition: '.7s' },
  enter: { opacity: 1, transition: '.7s' },
  exit: { opacity: 0, transition: '.7s' },
  onEnterComplete: () => {},
  onExitComplete: () => {},
  onTransitionComplete: () => {}
};


export default Transitional;