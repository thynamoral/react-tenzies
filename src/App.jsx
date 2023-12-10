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
  // useEffect
  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const allSameValue = dice.every(die => die.value === dice[0].value);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log(`You Won!`);
    } else {
      setTenzies(false);
    }
  }, [dice]);
  
  const rollDice = () => {
    setDice(oldDice => (
      oldDice.map(die => (
        die.isHeld
          ? die
          : getRandomDie()
      ))
    ));
  }
  const newGame = () => {
    setDice(allNewDice());
  }
  const heldDie = (targetIndex) => {
    setDice(prevDice => (
      prevDice.map((die, index) => {
        return index === targetIndex
          ? {...die, isHeld: !die.isHeld}
          : die
      })
    ))
  }
  const diceElements = dice.map((die, index) =>
    <Die
      key={index}
      value={die.value}
      isHeld={die.isHeld}
      heldDie={heldDie}
      dieIndex={index}
    />
  );

  return (
    <main className="app">
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instruction'>Roll until all dice are the same. Click each die to
        freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button 
        className="roll-dice" 
        onClick={tenzies ? newGame : rollDice}
      >
        {tenzies ? `New Game` : `Roll`}
      </button>
    </main>
  )
}

export default App
