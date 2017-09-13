import React from 'react';
import {render} from 'react-dom';

//Controller
import SessionManager from 'controller/session-manager.js';

//Nav
import Transitional from 'base/transitional.jsx';
import KronokuNav from 'comp/kronoku-nav.jsx';
import SetReminder from 'page/set-reminder.jsx';
import HomeFaq from 'page/home-faq.jsx';
import Home from 'page/home.jsx';

window.UserSession = new SessionManager();

//Pages
//---------------------------------------------------------------------------
const DesktopPages =  {
  home: <HomeFaq />,
  setreminder: <SetReminder />,
  faq: <HomeFaq />
}

const MobilePages =  {
  home: <Home />
}
//---------------------------------------------------------------------------


class App extends React.Component {
  constructor(props){
  	super(props);

    this.pages = DesktopPages;
    if (!this.pages[window.location.hash.replace('#', '')]){
      window.location.hash = '#home';
    }

    this.state = {
      reveal: false,
      activeHash: window.location.hash,
      activePage: this.pages[window.location.hash.replace('#', '')]
    }

    //console.log(window.location.hash);
    this.loadPage = this.loadPage.bind(this);
    this.handleTransitionComplete = this.handleTransitionComplete.bind(this);

    window.addEventListener('popstate', (e) => {
      this.loadPage(window.location.hash);
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        reveal: true
      });
    }, 1);
  }

  loadPage(hash){
    if (!this.pages[hash.replace('#', '')]){
      hash = '#home';
    }

    this.setState({
      activeHash: hash,
      reveal: false
    })
  }

  handleTransitionComplete(){
    this.setState({
      activePage: this.pages[this.state.activeHash.replace('#', '')],
      reveal: true
    }, () => {
      window.history.pushState(null, null, this.state.activeHash);
    });
  }

  render() {
    return (<div className="app">
              <KronokuNav />

              <Transitional isActive={ this.state.reveal }
                            initial={{ position: 'relative', top: '-50px', opacity: '0', transition: '1s'}}
                            enter={{ position: 'relative', top: '0px', opacity: '1', transition: '1s'}}
                            exit={{ position: 'relative', top: '50px', opacity: '0', transition: '1s'}}
                            onTransitionComplete={this.handleTransitionComplete} >

                { React.cloneElement(this.state.activePage, { title: "Ursh" }) }

              </Transitional>

            </div>)
  }

}

render(<App/>, document.getElementById('app'));