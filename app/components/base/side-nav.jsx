import React from 'react';
import Navicon from 'react-icons/lib/io/navicon.js';

class SideNav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen,
      headerIcon: props.headerIcon,
      headerTitle: props.headerTitle,
      widthOpen: 250
    };

  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isOpen !== nextProps.isOpen;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isOpen: nextProps.isOpen
    });
  }

  render() {
    return (
      <div className="sidenav" style={ { width: this.state.isOpen ? this.state.widthOpen : 0 } }>
        <div className="sidenav--header">

          <div className="sidenav--header-title">
            <Navicon size={30} style={{ marginRight: '15px', marginLeft: '15px' }} />
            <p> { this.state.headerTitle ? this.state.headerTitle : '' } </p>
          </div>
        
        </div>
        <div className="sidenav--item-container">

          {this.props.children}

        </div>
      </div>
      );
  }

}

class SideNavItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      key: props.key,
      title: props.title || '',
      isActive: props.isActive || false,
      onClick: props.onClick || function(){}
    };

    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnClick(){
    this.state.onClick(this.state.key);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isActive: nextProps.isActive
    });
  }

  render() {
    return (
      <div className="sidenav--item" 
           style={ this.state.isActive ? { color: 'black' } : { color: '' } }
           onClick={ this.handleOnClick }>

            {this.props.children}

        <p> {this.state.title} </p>

      </div>
      );
  }

}

export { SideNav, SideNavItem };