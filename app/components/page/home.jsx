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
                <InfoPanel />
            </div>)
  }

}

export default Home;