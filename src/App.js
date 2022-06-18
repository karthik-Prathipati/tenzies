import Confetti from 'react-confetti';
import { nanoid } from "nanoid";
import Die from './Die';
import './App.css';
import React from 'react'

export default function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)
  // time state that used to change on the basis of tenzies not working
  // const [record, setRecord] = React.useState(0)
  // var startTime = 0;
  const [stop, setStop] = React.useState(false)
  const [time, setTime] = React.useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  })
  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      setStop(true)
    }
  }, [dice])
  // use effect for time is showing errors and not displaying any time just showing NaN
  // create a new function for time that does not use Date fuction init
  // React.useEffect(() => {
  //   if (!tenzies) {
  //     startTime = new Date();
  //   }
  //   else {
  //     let endTime = new Date();
  //     const timeElapsed = endTime - startTime;
  //     console.log(startTime + " " + endTime);
  //     setRecord(prevRecord => {
  //       if (prevRecord === 0) return timeElapsed;
  //       else return prevRecord > timeElapsed ? timeElapsed : prevRecord;
  //     })
  //   }
  // }, [tenzies])
  React.useEffect(() => {
    setStop(false);
    const advanceTime = () => {

      setTimeout(() => {

        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;

        nSeconds++;

        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }

        !stop && setTime({ seconds: nSeconds, minutes: nMinutes, hours: nHours });
      }, 1000);
    };
    advanceTime();

    return () => {
      //final time:
      setStop(true)
    };
  }, [time]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie())
    }
    return newDice
  }


  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))
    } else {
      setTenzies(false)
      setStop(false)
      setDice(allNewDice())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } :
        die
    }))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same.
        Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
      {/* // div used to display the time  */}
      {/* <div className='time'>
        <p>
          {
            `${record / 60000 < 10 ? '0' + record / 60000 : record / 60000} mins : ${record / 1000 < 10 ? '0' + record / 1000 : record / 1000} secs`
          }
        </p>

      </div> */}
      <div className='time'>
        <p>
          {`
          ${time.hours < 10 ? '0' + time.hours : time.hours} :
          ${time.minutes < 10 ? '0' + time.minutes : time.minutes} :
          ${time.seconds < 10 ? '0' + time.seconds : time.seconds}
        `}
        </p>
      </div>
    </main>
  )
}
