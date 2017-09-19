import React from 'react';
//import PropTypes from 'prop-types';

class ShadowMenu extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      isOpen: false,
      reveal: false
    }
    
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen && !this.state.isOpen){

      this.fadeIn();

    } else if (!nextProps.isOpen && this.state.isOpen) {

      this.fadeOut();

    }
  }

  fadeIn(){
    //Component mounts
    this.setState({ isOpen: true}, () => {

      //Wait a bit, then reveal
      setTimeout(() => {
        this.setState({ 
          reveal: true 
        })
      }, 1);

    });
  }

  fadeOut(){
    //Fade component out
    this.setState({ reveal: false }, () => {

      //Wait until fade is complete, then unmount
      setTimeout(() => {
        this.setState({ 
          isOpen: false
        })
      }, 1000);

    });
  }

  render() {

    const overlay = (<div style={ this.state.reveal ? ShadowMenu.visibleStyle : ShadowMenu.hiddenStyle } >
                        { this.props.children }
                    </div>)

    return this.state.isOpen ? overlay : false;

  }

}

ShadowMenu.hiddenStyle = {
  position: 'fixed',
  top: '-60px',
  left: '0px',
  background: 'rgba(0,0,0,0.6)',
  width: '100%',
  height: '100%',
  opacity: '0',
  transition: '.5s'
}

ShadowMenu.visibleStyle = {
  position: 'fixed',
  top: '-60px',
  left: '0px',
  background: 'rgba(0,0,0,0.6)',
  zIndex: '1000',
  width: '100%',
  height: '100%',
  opacity: '1',
  transition: '.5s'
}

export default ShadowMenu;