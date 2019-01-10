
import React, { Component } from 'react';
import './App.css';
import Player from './components/players'
import cr7 from '../src/img/ronaldo.jpg'
import lm10 from '../src/img/lm10.jpg'
import pogba from '../src/img/paul.jpg';
import axios from 'axios';
  const playerData = [
    {
      name: 'Ronaldo',
      goals: 30,
      votes: 0,
      id: 1,
      image: cr7
    },
    {
      name: 'Messi',
      goals: 8,
      votes: 0,
      id: 2,
      image: lm10
    },
    {
      name: 'Pogba',
      goals: 26,
      votes: 0,
      id: 3,
      image: pogba
    }
  ];
  
  class App extends Component {

constructor() {
  super();
  this.drone = new window.Scaledrone('giJSOEI9gpOCt4Nx');
  this.drone.on('open', error => {
    if (error) {
      return console.error("Error");
    }
  })
  const room = this.drone.subscribe('live-votes');
  room.on('data', (data) => {
    this.state.playerDetails.map(player => {
      if (player.name === data) {
        return Object.assign({}, player, {
          votes: player.votes += 5
        });
      } else {
        return player;
      }
    });
    this.setState({
      playerDetails: this.state.playerDetails
    });
  });
}
  state = {
    playerDetails: []
  }
  
  componentDidMount() {
      this.setState({ playerDetails: playerData })
    }

  handleEvent = playerId => {
 
    const data = { playerId }
    axios.post('http://localhost:4000/vote', data)
    .then(data => {
      console.log(data)
      this.drone.publish({
        room: "live-votes",
        message: data.data.playerId
    })
   })
  }
    
    render() {
      return playerData.map(player =>
        <Player
          key={player.id}
          name={player.name}
          goals={player.goals}
          image={player.image}
          votes={player.votes}
          id={player.id}
          onVoteCasted={this.handleEvent}
        />);
    }
  }
  export default App;
