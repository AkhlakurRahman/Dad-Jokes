import React, { Component } from 'react';
import axios from 'axios';

import classes from './Jokes.module.css';
import Joke from './Joke/Joke';

export default class Jokes extends Component {
  state = {
    jokes: []
  };

  async componentDidMount() {
    while (this.state.jokes.length < 10) {
      let joke = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' }
      });
      this.setState(prevState => ({
        jokes: [
          ...prevState.jokes,
          {
            joke: joke.data.joke,
            votes: 0,
            id: joke.data.id
          }
        ]
      }));
    }
  }

  handleVote = (id, change) => {
    this.setState(prevState => ({
      jokes: prevState.jokes.map(joke =>
        joke.id === id ? { ...joke, votes: joke.votes + change } : joke
      )
    }));
  };

  render() {
    return (
      <div className={classes.Jokes}>
        <div className={classes.Jokes_Sidebar}>
          <h2>
            <span>Dad</span> Jokes
          </h2>
          <img
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="emoj"
          />
          <button>Get More</button>
        </div>
        <div className={classes.Joke}>
          {this.state.jokes.map(joke => (
            <Joke
              key={joke.id}
              joke={joke.joke}
              votes={joke.votes}
              upVote={() => this.handleVote(joke.id, 1)}
              downVote={() => this.handleVote(joke.id, -1)}
            />
          ))}
        </div>
      </div>
    );
  }
}
