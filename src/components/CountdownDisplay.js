import React from 'react'

const CountdownDisplay  = ({totalPomos, isBreak, timeLeft}) =>
  <div>
    <h1>Pomodoro Timer</h1>
    <h2>{isBreak ? "Break:" : "Pomo:"}</h2>
    <h3>Total Pomos Completed: {totalPomos}</h3>
    <p>{timeLeft}</p>
  </div>

export default CountdownDisplay
