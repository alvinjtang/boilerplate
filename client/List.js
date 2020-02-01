import React from 'react';
import PlayerForm from './playerForm';
import MovieForm from './movieForm';

const List = props => {
  console.log(props)
  return (
    <div className="list" key={list.playerName}>
      <PlayerForm id={list.id} playerName={list.playerName} handleClick={this.handleClick} deletePlayer={this.deletePlayer}/>
      {this.state.drafted ? null : <MovieForm list={list} addToList={this.addToList}/>}
      <ol>
        {list.movies.map(movieName => {
          return (
            <li  key={movieName}>{movieName}</li>
          );
        })}
      </ol>
    </div>
  )
}
