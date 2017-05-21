import React from 'react'
import CountdownDisplayContainer from '../containers/CountdownDisplayContainer'
import TimerControlsContainer from '../containers/TimerControlsContainer'
import SettingsContainer from '../containers/SettingsContainer'

const PomodoroTimer = () =>
  <div>
    <CountdownDisplayContainer />
    <TimerControlsContainer />
    <SettingsContainer />
  </div>

export default PomodoroTimer
