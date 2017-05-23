import * as constants from '../constants/Actions'

/* Actions: */
const actions = {
  changePomoLength: (pomoLength) =>
    ({ type: constants.CHANGE_POMO_LENGTH, pomoLength }),
  changeBreakLength: (breakLength) =>
    ({ type: constants.CHANGE_BREAK_LENGTH, breakLength }),
  startTimer: (startTime) =>
    ({ type: constants.START_TIMER}),
  pause: () =>
    ({ type: constants.PAUSE_TIMER }),
  reset: () => ({ type: constants.RESET_TIMER }),
  tick: () => ({ type: constants.TICK}),
  timerExpire: () => ({ type: constants.TIMER_EXPIRE }),
}

export default actions;
