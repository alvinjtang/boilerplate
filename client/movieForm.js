import React from 'react';

class MovieForm extends React.Component {
  constructor() {
    super();
    this.state = {
      movieTitle: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit() {
    event.preventDefault()
    this.props.addToList(this.props.list, this.state.movieTitle)
    this.setState({movieTitle: ''})
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text"
          name="movieTitle"
          value={this.state.movieTitle}
          onChange={this.handleChange}
        />
        <button
          type="submit"
          disabled={!this.state.movieTitle}
        >Add</button>
      </form>
    );
  }
}

export default MovieForm;
