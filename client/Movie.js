import React from 'react';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showUpdateForm: false,
      movieName: this.props.children,
    };
    this.updateForm = this.updateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children) {
      this.setState({movieName: this.props.children})
    }
  }
  handleChange() {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit() {
    event.preventDefault();
    this.props.updateMovieName(
      this.props.id,
      this.props.index,
      this.state.movieName
    );
    this.updateForm()
  }
  updateForm() {
    this.setState({ showUpdateForm: !this.state.showUpdateForm });
  }
  render() {
    return (
      <li className='movie' className="list-item">
        {this.state.showUpdateForm
          ? <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="movieName"
              value={this.state.movieName}
              onChange={this.handleChange}
            />
            <button type="submit">Update</button>
          </form>
          : this.state.movieName
        }
        <div>
          <button onClick={this.updateForm}>Change</button>
          <button>X</button>
        </div>
      </li>
    );
  }
}

export default Movie;
