import React from 'react'

const TimerControls = ({onPauseClick, onStartClick, onResetClick, elapsedTime, timerLength, isStarted, interval}) => <div>
    <button onClick={() => onStartClick(elapsedTime, timerLength, isStarted, interval)}>Start</button>
    <button onClick={() => onPauseClick(interval)}>Pause</button>
    <button onClick={() => onResetClick(interval)}>Reset</button>
  </div>

export default TimerControls
