import React from 'react';

//Nav
import OnClickOut from 'react-onclickout';
import { SideNav, SideNavItem } from 'base/side-nav.jsx';
import TopNav from 'base/top-nav.jsx';
import Hamburger from 'base/hamburger.jsx';

import InformationCircled from 'react-icons/lib/io/informatcircled.js';
import AlertCircled from 'react-icons/lib/io/alert-circled.js';
import IosAlarm from 'react-icons/lib/io/ios-alarm.js';
import IosPlus from 'react-icons/lib/io/ios-plus.js';
import AndroidHome from 'react-icons/lib/io/android-home.js';
import AndroidTextsms from 'react-icons/lib/io/android-textsms.js';

class KronokuNav extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      sideNavOpen: props.isOpen,
      activeKey: window.location.hash.replace('#', '')
    };

    window.addEventListener('popstate', (e) => {
      this.setState({
        activeKey: window.location.hash.replace('#', '')
      });
    });

    this.openSideNav = this.openSideNav.bind(this);
    this.closeSideNav = this.closeSideNav.bind(this);
    this.goHome = this.goHome.bind(this);
    this.goSetReminder = this.goSetReminder.bind(this);
    this.goMyReminders = this.goMyReminders.bind(this);
    this.goBlacklist = this.goBlacklist.bind(this);
    this.goFAQ = this.goFAQ.bind(this);
    this.goContact = this.goContact.bind(this);
  }

  openSideNav(){
    this.setState({ 
      sideNavOpen: true,
    });
  }

  closeSideNav(){
    if (this.state.sideNavOpen){
      this.setState({ sideNavOpen: false });
    } 
  }

  goHome(){
    window.location.hash = '#home';
    this.setState({
      activeKey: 'home',
      sideNavOpen: false
    });
  }

  goSetReminder(){
    window.location.hash = '#setreminder';
    this.setState({
      activeKey: 'setreminder',
      sideNavOpen: false
    });
  }

  goMyReminders(){
    window.location.hash = '#myreminders';
    this.setState({
      activeKey: 'myreminders',
      sideNavOpen: false
    });
  }

  goBlacklist(){
    window.location.hash = '#blacklist';
    this.setState({
      activeKey: 'blacklist',
      sideNavOpen: false
    });
  }

  goFAQ(){
    window.location.hash = '#faq';
    this.setState({
      activeKey: 'faq',
      sideNavOpen: false
    });
  }

  goContact(){
    window.location.hash = '#contact';
    this.setState({
      activeKey: 'contact',
      sideNavOpen: false
    });
  }

  render() {
    return (
        <TopNav title={"Kronoku"} style={{ fontFamily: 'Aqua', paddingTop: '5px' }}>
          <OnClickOut onClickOut={this.closeSideNav}>
            <Hamburger onClick={this.openSideNav} />

            <SideNav isOpen={this.state.sideNavOpen} headerTitle="Navigation">
              
              <SideNavItem title={"Home"} isActive={ this.state.activeKey === 'home' ? true : false } onClick={ this.goHome }>
                <AndroidHome size={25} style={ KronokuNav.itemStyle } />
              </SideNavItem>

              <SideNavItem title={"Set Reminder"} isActive={ this.state.activeKey === 'setreminder' ? true : false } onClick={ this.goSetReminder }>
                <IosPlus size={25} style={ KronokuNav.itemStyle } />
              </SideNavItem>

              <SideNavItem title={"My Reminders"} isActive={ this.state.activeKey === 'myreminders' ? true : false } onClick={ this.goMyReminders }>
                <IosAlarm size={25} style={ KronokuNav.itemStyle } />
              </SideNavItem>

              <SideNavItem title={"Blacklist"} isActive={ this.state.activeKey === 'blacklist' ? true : false } onClick={ this.goBlacklist }>
                <AlertCircled size={25} style={ KronokuNav.itemStyle } />
              </SideNavItem>

              <SideNavItem title={"About / FAQ"} isActive={ this.state.activeKey === 'faq' ? true : false } onClick={ this.goFAQ }>
                <InformationCircled size={25} style={ KronokuNav.itemStyle } />
              </SideNavItem>

              <SideNavItem title={"Contact"} isActive={ this.state.activeKey === 'contact' ? true : false } onClick={ this.goContact }>
                <AndroidTextsms size={25} style={ KronokuNav.itemStyle } />
              </SideNavItem>

            </SideNav>

          </OnClickOut>
        </TopNav>      
      );
  }

}

KronokuNav.itemStyle = {
  flexShrink: '0',
  marginRight: '30px',
  whiteSpace: 'nowrap'
}

export default KronokuNav;