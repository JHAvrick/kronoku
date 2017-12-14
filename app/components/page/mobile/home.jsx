import React from 'react';
import {render} from 'react-dom';

import InfoPanel from 'comp/info-panel.jsx';

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
                
                <InfoPanel style={{
                    width: '90%',
                    height: '84%',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -56%)'
                }}/>

            </div>)
  }

}

export default HomeMobile;
