import React from 'react';
import {render} from 'react-dom';

import InfoPanel from 'comp/info-panel.jsx';

class Home extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      reveal: false,
    }

  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        reveal: true
      });
    }, 1);
  }

  render() {
    return (<div>

              <Transitional isActive={ this.state.reveal }
                            initial={{ position: 'relative', top: '-50px', opacity: '0', transition: '1s' }}
                            enter={{ position: 'relative', top: '0px', opacity: '1', transition: '1s' }}
                            exit={{ position: 'relative', top: '50px', opacity: '0', transition: '1s' }}
                            onTransitionStart={this.handleTransitionStart}
                            onTransitionComplete={this.handleTransitionComplete} >


                <InfoPanel />

              </Transitional>

            </div>)
  }

}

export default Home;