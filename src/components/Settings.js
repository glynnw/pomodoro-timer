import React from 'react'

const Settings = ({breakLength, pomoLength,
                   handlePomoLength, handleBreakLength}) =>
  <div>
    <p>Pomo Length</p>
    <input type="number" value={pomoLength}
      onChange={handlePomoLength} min="1" max="60" step="1"/>
    <p>Break Length</p>
    <input type="number" value={breakLength}
      onChange={handleBreakLength} min="1" max="60" step="1"/>
  </div>

export default Settings
