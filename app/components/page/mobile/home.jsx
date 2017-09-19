import React from 'react';
import {render} from 'react-dom';

class HomeMobile extends React.Component {
  constructor(props){
  	super(props);

  }

  render() {
    return (<div style={{ display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center',
                          width: '100%',
                          height: '100%' 
                        }}>
                {"Mobile site is on its way!"}
            </div>)
  }

}

export default HomeMobile;