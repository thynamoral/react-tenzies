// packages
import { useEffect, useState } from 'react';
import Confetti from 'react-confetti'
// css files
import './App.css'
// components
import Die from './components/Die'
// utilities functions
import { getRandomDie } from './utilities';

const allNewDice = () => {
  const diceArray = [];
  for (let i = 0; i < 10; i++) {
    diceArray.push(getRandomDie());
  }
  return diceArray;
}

function App() {
  // states
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rollCount, setRollCount] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  // useEffect to check for winning condition
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allSameValue = dice.every((die) => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
      setIsRunning(false);
    } else {
      setTenzies(false);
      setIsRunning(true);
    }
  }, [dice]);

  // useEffect to track time spent
  useEffect(() => {
    console.log(isRunning);
    let trackInterval;
    if (isRunning && !dice.every((die) => !die.isHeld)) {
      trackInterval = setInterval(() => {
        setTimeSpent((prevTimeSpent) => prevTimeSpent + 1);
      }, 1000);
    }
    return () => clearInterval(trackInterval);
  }, [isRunning, dice]);

  const rollDice = () => {
    setDice((oldDice) =>
      oldDice.map((die) => (die.isHeld ? die : getRandomDie()))
    );
    setRollCount((prevCount) => prevCount + 1);
  };
  const newGame = () => {
    setDice(allNewDice());
    setRollCount(0);
    setTimeSpent(0);
  };
  const heldDie = (targetIndex) => {
    setDice((prevDice) =>
      prevDice.map((die, index) => {
        return index === targetIndex ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  };
  const diceElements = dice.map((die, index) => (
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      heldDie={heldDie}
      dieIndex={index}
    />
  ));

  return (
    <div className="app">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instruction">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dice-container">{diceElements}</div>
        <button className="roll-dice" onClick={tenzies ? newGame : rollDice}>
          {tenzies ? `New Game` : `Roll`}
        </button>
      </main>
      <div className="summary-stats">
        <p className="total-roll">
          Total roll : <span className={tenzies ? "won" : ""}>{rollCount}</span>
        </p>
        <p className="time-spent">
          Time spent :{" "}
          <span className={tenzies ? "won" : ""}>{timeSpent}s</span>
        </p>
      </div>
    </div>
  );
}

export default App
