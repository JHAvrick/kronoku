import React from 'react';
import PropTypes from 'prop-types';

class TopNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
    };

    this.style = Object.assign({}, TopNav.defaultProps.style || {}, props.style || {});
  }

  render() {
    return (
      <div style={this.style}>

          <div style={{ display: 'flex', 
                        flexGrow: '0.5', 
                        justifyContent: 'flex-start', 
                        alignItems: 'center',
                        paddingLeft: '20px' }}>
          
            { this.props.children  }

          </div>

          <div style={{ display: 'flex', 
                        flexGrow: '0.5', 
                        justifyContent: 'flex-end', 
                        alignItems: 'center', 
                        paddingRight: '20px' }}>

            <img src="resources/icon/kronoku.png" style={{ height:'30px', width:'30px', marginBottom:'5px' }} />

            { this.state.title }

          </div>

      </div> );
  }

}

class TopNavItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      active: false,
      onClick: props.onClick || function(){}
    };

    this.style = Object.assign({}, TopNavItem.defaultProps.style || {}, props.style || {});
  }

  render() {
    return (
      <div style={this.style}>

        { this.state.title }

      </div> );
  }

}

TopNavItem.defaultProps = {
  style: {
    width: '100px',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  }
}

TopNav.propTypes = {
  title: PropTypes.string,
  style: PropTypes.object
}

TopNav.defaultProps = {
  title: null,
  style: {
    width: '100%',
    height: '55px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    boxShadow: '#d8e3e9 0 0 10px',
    fontSize: '26px'
  }
}

export default TopNav;
