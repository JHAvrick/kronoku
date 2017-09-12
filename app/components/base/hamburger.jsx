import React from 'react';
import PropTypes from 'prop-types';

class Hamburger extends React.Component {

  constructor(props) {
    super(props);

    this.isHovering = false;
    this.state = {
      onClick: props.onClick,
      isHovering: false
    };

    this.barStyle = Object.assign({}, Hamburger.barStyle, props.style);
    this.barStyleTopHover = Object.assign({}, this.barStyle, Hamburger.barStyleTopHover);
    this.barStyleBottomHover = Object.assign({}, this.barStyle, Hamburger.barStyleBottomHover);

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick(){
      this.state.onClick();
  }

  handleMouseOver(){
    this.setState({
      isHovering: true
    });
  }

  handleMouseOut(){
    this.setState({
      isHovering: false
    });
  }

  render() {
    return (
      <div  style={ Hamburger.containerStyle } 
            onClick={ this.handleClick } 
            onMouseOver={ this.handleMouseOver }
            onMouseOut={ this.handleMouseOut } >

        <div style={ this.state.isHovering ? this.barStyleTopHover : this.barStyle }></div>
        <div style={ this.barStyle }></div>
        <div style={ this.state.isHovering ? this.barStyleBottomHover : this.barStyle }></div>

      </div>
    );
  }

}

//Defaults
Hamburger.propTypes = {
  onClick: PropTypes.func,
  isHovering: PropTypes.bool,
  style: PropTypes.object
};

Hamburger.defaultProps = {
  onClick: () => {},
  isHovering: false,
  style: {
      backgroundColor: '#000000'
  }
};

Hamburger.containerStyle = {
  display: 'inline-block',
  verticalAlign: 'middle',
  height: '36px'
}

Hamburger.barStyle = {
  width: '35px',
  height: '4px',
  margin: '6px 0',
  borderRadius: '5px',
  transition: '0.4s'
}

Hamburger.barStyleTopHover = {
  transform: 'translate(0px, -3px)',
  transition: '0.2s'
}

Hamburger.barStyleBottomHover = {
  transform: 'translate(0px, 3px)',
  transition: '0.2s'
}

export default Hamburger;

/*
.hamburger-container {

  display: inline-block;
  vertical-align: middle;

  .hamburger-bar-top, .hamburger-bar-middle, .hamburger-bar-bottom {
    width: 35px;
    height: 5px;
    background-color: #ffffff;
    margin: 6px 0;
    transition: 0.4s;
  }

  &:hover {

    .hamburger-bar-top {
      transform: translate(0px, -3px) ;
      transition: 0.2s;
    }

    .hamburger-bar-bottom {
      transform: translate(0px, 3px) ;
      transition: 0.2s;
    }

  }

}
*/