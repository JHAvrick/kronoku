import React from 'react';
import PropTypes from 'prop-types';

class Panel extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      isVisible: props.isVisible,
      className: props.className,
      title: props.title
    }

    //Merge default style w/ prop style
    this.style = props.style;

  }

  render() {
    return (<div className={this.state.className} style={this.style}>
              <h1> { this.state.title } </h1>
              { this.props.children }
            </div>)
  }

}

//Defaults
Panel.propTypes = {
  isVisible: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
};

Panel.defaultProps = {
  isVisible: true,
  className: 'panel',
  style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'white',
      boxShadow: '#d8e3e9 0 0 10px',
      borderRadius: '5px',
      width: '100px',
      height: '100px' 
  }
};


export default Panel;