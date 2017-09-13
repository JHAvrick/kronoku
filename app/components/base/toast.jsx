import React from 'react';
import PropTypes from 'prop-types';

class Toast extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      text: props.text,
      type: props.type
    }

    this.style = Object.assign({}, Toast.style.base, Toast.style[props.type]);
  }



  render() {
    return (<div className="toast">

            </div>)
  }

}

Toast.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string
}

Toast.defaultProps = {
  text: 'Toast Message',
  type: 'success'
}

Toast.style = {
  base: {
    display: 'flex',
    opacity: '0.7',
    transition: '.5s'
  },
  success: {
    backgroundColor: red
  }
}

export default Toast;