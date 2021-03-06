import React from 'react';
import {render} from 'react-dom';

//Controller
import SessionManager from 'controller/session-manager.js';

//Nav
import Transitional from 'base/transitional.jsx';
import KronokuNav from 'comp/kronoku-nav.jsx';
import { ToastContainer, toast } from 'react-toastify';

//Desktop pages
import SetReminder from 'page/set-reminder.jsx';
import MyReminders from 'page/my-reminders.jsx';
import MyContacts from 'page/my-contacts.jsx';
import HomeFaq from 'page/home-faq.jsx';
import Blacklist from 'page/blacklist.jsx';

//Mobile pages
import HomeMobile from 'page/mobile/home.jsx';

window.UserSession = new SessionManager();

//Pages
//---------------------------------------------------------------------------
const DesktopPages =  {
  home: <HomeFaq />,
  setreminder: <SetReminder />,
  myreminders: <MyReminders />,
  mycontacts: <MyContacts />,
  faq: <HomeFaq />,
  blacklist: <Blacklist />
}

const MobilePages =  {
  home: <HomeMobile />,
  setreminder: <HomeMobile />,
  myreminders: <HomeMobile />,
  faq: <HomeMobile />,
  blacklist: <HomeMobile />
}
//---------------------------------------------------------------------------


class App extends React.Component {
  constructor(props){
  	super(props);

    /*
    var mediaQuery = window.matchMedia('only screen and (max-width: 600px)');
    if (mediaQuery.matches) this.pages = MobilePages;
    else this.pages = DesktopPages;
    */

    this.pages = DesktopPages;
    
    /*
    mediaQuery.onchange = function(change){
      if (change.matches){
        console.log("Small");
      } else {
        console.log("Not small.");
      }
    }

    
    window.onresize = function(){
      
      if (change.matches){
        console.log("Small");
      } else {
        console.log("Not small.");
      }
    }
    */

    //this.pages = DesktopPages;
    if (!this.pages[window.location.hash.replace('#', '')]){
      window.history.pushState(null, null, '#home');
    }

    this.state = {
      reveal: true,
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

              <ToastContainer position="top-right"
                              type="default"
                              autoClose={5000}
                              hideProgressBar={false}
                              newestOnTop={false}
                              closeOnClick
                              pauseOnHover />

              <Transitional isActive={ this.state.reveal }
                            initial={{ position: 'relative', top: '-50px', opacity: '0', transition: '1s'}}
                            enter={{ transform: 'translate3d(0,0,0)', position: 'relative', top: '0px', opacity: '1', transition: '1s'}}
                            exit={{ transform: 'translate3d(0,0,0)', position: 'relative', top: '50px', opacity: '0', transition: '1s'}}
                            onTransitionComplete={this.handleTransitionComplete} >

                { React.cloneElement(this.state.activePage, {/* props go here, if it comes up */}) }

              </Transitional>

            </div>)
  }

}

render(<App/>, document.getElementById('app'));