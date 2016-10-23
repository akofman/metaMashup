import React, { Component } from 'react';

import './styles.css';

const entries = [
  {text: 'Blow Up « Pulp Fiction en 5 minutes » 05:06', video: require('../pulp.mp4')},
  {text: 'Arte Info « Rencontre avec Stéphane Blanquet, artist hors normes » 02:35', video: require('../stephane.mp4')},
  {text: 'Tracks « Un documentaire sur Pulp, groupe phare de la brit Pop » 05:15', video: require('../pulp.mp4')},
  {text: 'BiTS « Pulp, Populaire du XXè siècle » 22:53', video: require('../stephane.mp4')}
]

export default class Sidebar extends Component {
  state = {
    activeEntry: -1
  }
  onClick = (entry, i) => {
    this.setState({
      activeEntry: i
    })
    if (this.props.onClick) {
      this.props.onClick(entry, i)
    }
  }
  render() {
    return (<div className="Sidebar">
              <div className="Sidebar__top"></div>
              { entries.map((entry, i) => {
                return <div key={ entry.text } className={ 'Sidebar__entry ' + (this.state.activeEntry === i ? 'Sidebar__entry--active': '') } onClick={ () => this.onClick(entry, i) }>{ entry.text }</div>
              })}
            </div>)
  }
}
