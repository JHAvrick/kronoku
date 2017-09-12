import React from 'react';
import {render} from 'react-dom';

import InfoPanel from 'comp/info-panel.jsx';
import FaqPanel from 'comp/faq-panel.jsx';

class HomeFaq extends React.Component {
  constructor(props){
  	super(props);

    this.state = {}
  }

  render() {
    return (<div style={{ height: '100%' }}>

                <div style={{ display: 'flex', 
                              flexDirection: 'row', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              width: '95%',
                              height: ' calc(100% - 55px)',
                              margin: 'auto'
                            }}>

                  <FaqPanel style={{
                    flexGrow: '.1',
                    height: '90%',
                    margin: 'auto' 
                  }}  />

                  <InfoPanel style={{
                    flexGrow: '.9',
                    height: '90%',
                    margin: 'auto',
                    marginLeft: '20px'
                  }} />

                </div>

            </div>)
  }

}

export default HomeFaq;