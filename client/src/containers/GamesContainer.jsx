import React, { Component } from 'react';
import { Modal, GamesListManager } from '../components';

export default class GamesContainer extends Component {
  constructor (props) {
    super(props);
    // The initial state
    this.state = {
      games: [],
      selectedGame: [],
      searchBar: ''
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteGame = this.deleteGame.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
  }
  // fetch data from server after comp mounts
  componantDidMount () {
    this.getGames();
  }

  toggleModal (index) {
    this.setState({ selectedGame: this.state.games[index] })
    // use bootstrap modal syntax
    $('#game-modal').modal();
  }

  getGames () {
    fetch('http://localhost:8080/games', {
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json()) // The json response to object literal
      .then(data => this.setState({ games: data }));
  }

  deleteGame (id) {
    fetch(`http://localhost:8080/games/${id}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => {
        // The game is also removed from the state thanks to the filter function
        this.setState({ games: this.state.games.filter(game => game._id !== id) });
        console.log(response.message);
      });
  }

  setSearchBar (event) {
    this.setState({ searchBar: event.target.value.lowercase() });
  }

  render () {
    const { games, selectedGame, searchBar } = this.state;
    return (
      <div>
        <Modal game={selectedGame} />
        <GamesListManager
          games={games}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteGame={this.deleteGame}
        />
      </div>
    );
  }
}