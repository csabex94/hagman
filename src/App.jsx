import React, { useReducer, useEffect } from 'react';

import { getImages, randomWord, helpLetters, maxWrong } from './const';
import './App.css';

const ACTIONS = {
  HANDLE_GUESS: "HANDLE_GUESS",
  RESET_STATE: "RESET_STATE",
  INIT: "INIT",
  GAME_OVER: "GAME_OVER",
  WIN: "WIN"
}

const INITIAL_STATE = {
  numWrong: 0,
  answer: "",
  guessed: new Set(),
  gameOver: false,
  win: false
}

const IMAGES = getImages();

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case ACTIONS.INIT:
      return {
        ...state,
        answer: action.payload.word,
        guessed: action.payload.guessedHelp,
        gameOver: false,
        win: false
      }

    case ACTIONS.HANDLE_GUESS:
      return {
        ...state,
        guessed: state.guessed.add(action.payload),
        numWrong: state.numWrong + (state.answer.includes(action.payload) ? 0 : 1)
      }

    case ACTIONS.RESET_STATE:
      return {
        ...state,
        answer: action.payload.word,
        guessed: action.payload.guessedHelp,
        numWrong: 0,
        gameOver: false,
        win: false
      }

    case ACTIONS.WIN:
      return {
        ...state,
        win: true
      }

    case ACTIONS.GAME_OVER:
      return {
        ...state,
        win: false,
        gameOver: true
      }

    default:
      return state;

  }

}


const App = () => {

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const initState = () => {
    let word = randomWord();
    let guessedHelp = helpLetters(word);
    return { word, guessedHelp }
  }

  useEffect(() => {
    dispatch({ type: ACTIONS.INIT, payload: initState() })
  }, []);

  useEffect(() => {
    if (state.numWrong >= maxWrong) {
      dispatch({ type: ACTIONS.GAME_OVER })
    }
  }, [state.numWrong])

  const guessedWord = () => {
    return state.answer.split("").map(letter => (state.guessed.has(letter) ? letter : "_"))
  }

  const handleGuess = (event) => {
    let letter = event.target.value;
    dispatch({ type: ACTIONS.HANDLE_GUESS, payload: letter });
  }

  const renderButtons = () => {
    return "qwertyuiopasdfghjklzxcvbnm".split("").map((letter, i) => (
      <button
        key={i}
        value={letter}
        className="letter-btn"
        onClick={handleGuess}
        disabled={state.guessed.has(letter)}
      >{letter}</button>
    ))
  }

  const resetState = () => dispatch({ type: ACTIONS.RESET_STATE, payload: initState() })

  return (

    <div style={{ backgroundImage: 'url(images/background.jpg)' }} className="main">
      <h1 className="title">Hangman</h1>
      <img className="img" src={IMAGES[state.numWrong]} alt=":("/>
      <p className="guessed_wrong">Guessed Wrong: {state.numWrong}</p>
      { state.gameOver ? <p className="gameover-text">Game Over!</p> : null }
      { guessedWord().join("") === state.answer && <p className="win-text">You Win!</p> }
      <p className="guessed_word">{state.gameOver ? state.answer : guessedWord()}</p>
      <p className="buttons">
        {renderButtons()}
      </p>
      <button
        className="restart-btn"
        onClick={resetState}
      >
        Restart
      </button>
    </div>

  );


};

export default App;