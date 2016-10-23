import React, { Component } from 'react';

import Sidebar from 'react-sidebar';
import MaterialTitlePanel from './material_title_panel';
import SidebarContent from './sidebar_content';
import { default as SidebarEmilie} from './Sidebar';

const styles = {
  contentHeaderMenuLink: {
    textDecoration: 'none',
    color: 'white',
    padding: 8,
  },
  content: {
    padding: '16px',
  },
};

class App extends Component{
  state = {
    video: require('./mashup-intro.mp4'),
    docked: false,
    open: false,
    transitions: true,
    touch: true,
    shadow: true,
    pullRight: true,
    touchHandleWidth: 20,
    dragToggleDistance: 30
  }

  onSetOpen = (open) => {
    this.setState({open: open});
  }

  menuButtonClick = (ev) => {
    ev.preventDefault();
    this.onSetOpen(!this.state.open);
  }

  renderPropCheckbox = (prop) => {
    const toggleMethod = (ev) => {
      const newState = {};
      newState[prop] = ev.target.checked;
      this.setState(newState);
    };

    return (
      <p key={prop}>
        <input type="checkbox" onChange={toggleMethod} checked={this.state[prop]} id={prop} />
        <label htmlFor={prop}> {prop}</label>
      </p>);
  }

  renderPropNumber = (prop) => {
    const setMethod = (ev) => {
      const newState = {};
      newState[prop] = parseInt(ev.target.value, 10);
      this.setState(newState);
    };

    return (
      <p key={prop}>
         {prop} <input type="number" onChange={setMethod} value={this.state[prop]} />
      </p>);
  }

  onSidebarClick = (entry, i) => {
    console.log('io', entry, i);
    this.setState({
      video: entry.video,
      open: false
    }, () => {
      this.refs.video.play()
    })
  }

  render() {
    //const sidebar = <SidebarContent />;

    const contentHeader = (
      <span>
        {!this.state.docked &&
         <a onClick={this.menuButtonClick} href="#" style={styles.contentHeaderMenuLink}>=</a>}
        <span> React Sidebar</span>
      </span>);

    const sidebarProps = {
      sidebar: <SidebarEmilie onClick={ this.onSidebarClick } />,
      docked: this.state.docked,
      sidebarClassName: 'custom-sidebar-class',
      open: this.state.open,
      touch: this.state.touch,
      shadow: this.state.shadow,
      pullRight: this.state.pullRight,
      touchHandleWidth: this.state.touchHandleWidth,
      dragToggleDistance: this.state.dragToggleDistance,
      transitions: this.state.transitions,
      onSetOpen: this.onSetOpen,
    };

    return (
      <Sidebar {...sidebarProps}>
        <div className="Header">
          <div className="Header__text" onClick={this.menuButtonClick}><img width="64" src={ require('./icon-menu.svg') }/> SOMMAIRE</div>
        </div>
        
        <div style={styles.content}>
          <video ref="video" src={ this.state.video } width="100%" autoPlay></video>
        </div>
      
      </Sidebar>
    );
  }
}

export default App;
