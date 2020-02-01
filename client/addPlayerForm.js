import React from 'react';

class AddPlayerForm extends React.Component {
  constructor() {
    super()
    this.state = {
      playerName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.addPlayer(this.state.playerName)
    this.setState({ playerName: '' })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="playerName"
          value={this.state.playerName}
          onChange={this.handleChange}
        />
        <button type="submit">Add Player</button>
      </form>
    )
  }
}

export default AddPlayerForm;
