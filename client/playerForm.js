import React from 'react';
import Button from './components/Button';
import styled from 'styled-components';

const DeleteButton = styled.button`
  display: flex;
  justify-content: center;
  background-color: #FF0000;
  color: #FFFFFF;
  height: 20px;
  width: 20px;
  border-radius: 5px;
`;

class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changeName: false,
      playerName: this.props.playerName
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick() {
    const newState = { ...this.state, changeName: !this.state.changeName };
    this.setState(newState);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({changeName: false})
  }
  render() {
    return (
      <>
        {this.state.changeName ? (
          <form onSubmit={this.handleSubmit}>
            <input type="text"
              name="playerName"
              value={this.state.playerName}
              onChange={this.handleChange}
            />
            <button type='submit'>Done</button>
          </form>
        ) : (
          <div>
              <DeleteButton type="button" onClick={() => this.props.deletePlayer(this.props.id)}>X</DeleteButton>
            <h1 className="player-name">{this.state.playerName}</h1>
            <button type="button" onClick={this.handleClick}>Change Name</button>
          </div>
          )}
      </>
    );
  }
}

export default PlayerForm;
