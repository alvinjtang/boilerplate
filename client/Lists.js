import React from 'react';
import draft from './utils/draft';
import AddPlayerForm from './addPlayerForm';
import PlayerForm from './playerForm';
import MovieForm from './movieForm';
import Movie from './Movie';

const dummyData = [
  {
    id: 1,
    playerName: 'Alvin',
    movies: [
      'x-men',
      'toy story',
      'iron man',
      'MIB',
      'harry potter',
      'captain america',
    ],
  },
  {
    id: 2,
    playerName: 'Dan',
    movies: [
      'iron man',
      'toy story',
      'captain america',
      'harry potter',
      'MIB',
      'x-men',
    ],
  },
];

class Lists extends React.Component {
  constructor() {
    super();
    this.state = {
      drafted: false,
      playerForm: false,
      listsData: [],
      movieList: [],
      movieTitle: '',
    };
    this.addToList = this.addToList.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
    this.showAddPlayer = this.showAddPlayer.bind(this);
    this.handleDraft = this.handleDraft.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deletePlayer = this.deletePlayer.bind(this);
    this.reset = this.reset.bind(this);
    this.updateMovieName = this.updateMovieName.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }
  // componentDidMount() {
  //   this.addPlayer('Alvin');
  //   this.addPlayer('Dan');
  // }
  addToList(list, newMovie) {
    const newMovieList = list.movies.push(newMovie);
    const newList = { ...list, movies: newMovieList };
    this.setState(newList);
  }
  addPlayer(newPlayerName) {
    const newList = this.state.listsData;
    newList.push({
      id: this.state.listsData.length,
      playerName: newPlayerName,
      movies: this.state.movieList.slice(),
    });
    this.setState({ listsData: newList });
  }
  showAddPlayer() {
    this.setState({ playerForm: true });
  }
  handleDraft() {
    let draftedLists = draft(this.state.listsData);
    console.log(draftedLists)
    this.setState({ drafted: true, listsData: draftedLists });
  }
  handleSubmit() {
    event.preventDefault();
    let newList = this.state.movieList;
    newList.push(this.state.movieTitle);
    let listsDataCopy = this.state.listsData;
    listsDataCopy.forEach(list => {
      list.movies.push(this.state.movieTitle);
    });
    this.setState({
      listsData: listsDataCopy,
      movieList: newList,
      movieTitle: '',
    });
  }
  handleChange() {
    this.setState({ [event.target.name]: event.target.value });
  }
  deletePlayer(id) {
    const listsDataCopy = this.state.listsData;
    const newList = listsDataCopy.filter(player => player.id !== id);
    this.setState({ listsData: newList });
  }
  reset() {
    const listsDataCopy = this.state.listsData;
    console.log(listsDataCopy)
    listsDataCopy.forEach(
      player => (player.movies = [])
    );
    this.setState({ listsData: listsDataCopy, drafted: false });
  }
  updateMovieName(playerId, movieIndex, updatedMovieName) {
    const listsDataCopy = this.state.listsData;
    listsDataCopy.forEach(list => {
      if (list.id === playerId) {
        list.movies.splice([movieIndex], 1, updatedMovieName);
      }
    });
    this.setState({ listsData: listsDataCopy });
  }
  deleteMovie() {}
  render() {
    return (
      <div>
        <div className="lists-div">
          {this.state.listsData.map((list, i) => {
            return (
              <div className="list" key={i}>
                <PlayerForm
                  id={list.id}
                  playerName={list.playerName}
                  handleClick={this.handleClick}
                  deletePlayer={this.deletePlayer}
                />
                {this.state.drafted ? null : (
                  <MovieForm list={list} addToList={this.addToList} />
                )}
                <ol>
                  {list.movies.map((movieName, index) => {
                    return (
                      <Movie
                        key={index}
                        playerId={list.id}
                        index={index}
                        updateMovieName={this.updateMovieName}
                        deleteMovie={this.deleteMovie}
                      >
                        {movieName}
                      </Movie>
                    );
                  })}
                </ol>
              </div>
            );
          })}
        </div>
        {this.state.playerForm ? (
          <AddPlayerForm addPlayer={this.addPlayer} />
        ) : null}
        <div className="btn-div">
          <button type="button" onClick={this.handleDraft}>
            Draft
          </button>
          <button type="button" onClick={this.showAddPlayer}>
            Add Player
          </button>
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Lists;
