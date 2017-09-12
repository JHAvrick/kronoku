import React from 'react';

//AmPmToggle is a controlled component
//Clicking the toggle will not change its state, but will trigger a callback which
//should decide whether to update the state or not
class AmPmToggle extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      color: props.color,
      pm: props.pm,
      onChange: props.onChange
    };

    this.style = {
      active: {
        color: 'white',
        backgroundColor: props.color
      },
      inactive: {
        color: props.color,
        backgroundColor: 'white'
      }
    }

    this.onClickHandler = this.onClickHandler.bind(this);
  }

  onClickHandler(){
    if (this.state.onChange)
      this.state.onChange();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      pm: nextProps.pm
    });
  }

  render() {
    return (
      <div className="am-pm-container" onClick={this.onClickHandler}>

        <span className={ this.state.pm ? 'am-pm-inactive' : 'am-pm-active' }> 
          { "AM" } 
        </span>

        <span className={ this.state.pm ? 'am-pm-active' : 'am-pm-inactive' } > 
          { "PM" } 
        </span>

      </div>
    );
  }
}

export default AmPmToggle;