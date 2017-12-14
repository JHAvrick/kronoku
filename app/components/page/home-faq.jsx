import React from 'react';
import {render} from 'react-dom';

import InfoPanel from 'comp/info-panel.jsx';
import FaqPanel from 'comp/faq-panel.jsx';

class HomeFaq extends React.Component {
  constructor(props){
  	super(props);

  }

  render() {
    return (<div style={{ height: '100%' }}>

                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '95%',
                  height: ' calc(100% - 55px)',
                  margin: 'auto'
                }}>

                  <FaqPanel className="collapse--small" style={{
                              height: '90%',
                              width: '100%',
                              margin: 'auto',
                              marginRight: '20px'
                            }}/>

                  <InfoPanel style={{
                              height: '90%',
                              width: '100%',
                              margin: 'auto',
                            }}/>

                </div>

            </div>)
  }

}

export default HomeFaq;