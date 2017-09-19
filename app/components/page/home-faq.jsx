import React from 'react';
import {render} from 'react-dom';

import InfoPanel from 'comp/info-panel.jsx';
import FaqPanel from 'comp/faq-panel.jsx';

class HomeFaq extends React.Component {
  constructor(props){
  	super(props);

    this.state = {
      row: true
    }


    this.respond = this.respond.bind(this);
    var mediaQuery = window.matchMedia('only screen and (max-width: 800px)');
        mediaQuery.onchange = this.respond;

  }

  respond(change){
    if (change.matches){
      console.log("!!!!!!!!!!!!!");
      this.setState({ row: false });
    } else {
      console.log("%%%%%%%%%%%%%");
      this.setState({ row: true });
    }
  }

  render() {
    return (<div style={{ height: '100%' }}>

                <div style={  this.state.row 
                              ? HomeFaq.styles.container.rowStyle 
                              : HomeFaq.styles.container.columnStyle }>

                  <FaqPanel style={ this.state.row 
                                    ? HomeFaq.styles.faqPanel.rowStyle 
                                    : HomeFaq.styles.faqPanel.columnStyle }/>

                  <InfoPanel style={  this.state.row 
                                      ? HomeFaq.styles.infoPanel.rowStyle 
                                      : HomeFaq.styles.infoPanel.columnStyle }/>

                </div>

            </div>)
  }

}

HomeFaq.styles = {

  container: {
    rowStyle: { 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '95%',
      height: ' calc(100% - 55px)',
      margin: 'auto'
    },
    columnStyle: { 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      width: '95%',
      height: ' calc(100% - 55px)',
      margin: 'auto'
    }
  },

  faqPanel: {
    rowStyle: {
      flexGrow: '.1',
      height: '90%',
      margin: 'auto' 
    },
    columnStyle: {
      backgroundColor: 'blue',
      flexGrow: '0',
      width: '100%',
      height: '90%',
      margin: 'auto'
    }
  }, 

  infoPanel: {
    rowStyle: {
      flexGrow: '.9',
      height: '90%',
      margin: 'auto',
      marginLeft: '20px'
    },
    columnStyle: {
      backgroundColor: 'blue',
      flexGrow: 'none',
      width: '100%',
      height: '90%',
      margin: 'auto'
    }
  }
}

export default HomeFaq;