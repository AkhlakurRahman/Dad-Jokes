import React from 'react';

import classes from './Joke.module.css';

const Joke = props => {
  const getColorByVotes = () => {
    if (props.votes >= 15) {
      return '#4caf50';
    } else if (props.votes >= 12) {
      return '#8bc34a';
    } else if (props.votes >= 9) {
      return '#cddc39';
    } else if (props.votes >= 6) {
      return '#ffeb3b';
    } else if (props.votes >= 3) {
      return '#ffc107';
    } else if (props.votes >= 0) {
      return '#ff9800';
    } else {
      return '#f44336';
    }
  };

  const getEmojiByVotes = () => {
    if (props.votes >= 15) {
      return 'em em-rolling_on_the_floor_laughing';
    } else if (props.votes >= 12) {
      return 'em em-laughing';
    } else if (props.votes >= 9) {
      return 'em em-smiley';
    } else if (props.votes >= 6) {
      return 'em em-slightly_smiling_face';
    } else if (props.votes >= 3) {
      return 'em em-neutral_face';
    } else if (props.votes >= 0) {
      return 'em em-confused';
    } else {
      return 'em em-angry';
    }
  };

  return (
    <div className={classes.Joke}>
      <div className={classes.Joke_buttons}>
        <i
          className={`${classes.upVote} fas fa-arrow-up`}
          onClick={props.upVote}
        />
        <span
          className={classes.Joke_votes}
          style={{ borderColor: getColorByVotes() }}
        >
          {props.votes}
        </span>
        <i
          className={`${classes.downVote} fas fa-arrow-down`}
          onClick={props.downVote}
        />
      </div>
      <div className={classes.Joke_text}>{props.joke}</div>
      <div className={classes.Joke_smiley}>
        <i className={getEmojiByVotes()} />
      </div>
    </div>
  );
};

export default Joke;
