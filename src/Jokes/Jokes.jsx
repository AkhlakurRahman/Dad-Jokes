import React, { Component } from 'react';
import axios from 'axios';
import uuid from 'uuid/v4';

import classes from './Jokes.module.css';
import Joke from './Joke/Joke';

export default class Jokes extends Component {
  state = {
    jokes: JSON.parse(window.localStorage.getItem('Jokes') || '[]'),
    loading: false
  };

  seenJokes = new Set(this.state.jokes.map(joke => joke.joke));

  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }

  getJokes = async () => {
    try {
      let jokes = [];

      while (jokes.length < 10) {
        let joke = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' }
        });
        console.log(this.seenJokes.has(joke.data.joke));
        if (!this.seenJokes.has(joke.data.joke)) {
          jokes.push({
            id: uuid(),
            joke: joke.data.joke,
            votes: 0
          });
        } else {
          console.log('Duplicate');
        }
      }
      this.setState(
        prevState => ({
          jokes: [...prevState.jokes, ...jokes],
          loading: false
        }),
        () => {
          window.localStorage.setItem(
            'Jokes',
            JSON.stringify(this.state.jokes)
          );
        }
      );
    } catch (error) {
      alert('Server Error, will come back soon');
      this.setState({ loading: false });
    }
  };

  handleGetJokes = () => {
    this.setState({ loading: true });
    this.getJokes();
  };

  handleVote = (id, change) => {
    this.setState(
      prevState => ({
        jokes: prevState.jokes.map(joke =>
          joke.id === id ? { ...joke, votes: joke.votes + change } : joke
        )
      }),
      () => {
        window.localStorage.setItem('Jokes', JSON.stringify(this.state.jokes));
      }
    );
  };

  render() {
    console.log(this.seenJokes);
    if (this.state.loading) {
      return (
        <div className={classes.Jokes_Spinner}>
          <i className="far fa-8x fa-laugh fa-spin" />
          <h1>Loading...</h1>
        </div>
      );
    }
    const jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
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
          <button onClick={this.handleGetJokes}>Fetch Jokes</button>
        </div>
        <div className={classes.Joke}>
          {jokes.map(joke => (
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
