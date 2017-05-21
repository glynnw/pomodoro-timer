import * as actionTypes from '../constants/Actions'

/* State */
const initialState = {
  pomoLength: 25,
  breakLength: 5,
  isBreak: false,
  totalPomos: 0,
  elapsedTime: 0,
  timerLength: 25,
  interval: null,
  isStarted: false,
}

/* Reducer */
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.CHANGE_POMO_LENGTH:
      return Object.assign({}, state, {
        pomoLength: parseInt(action.pomoLength),
      })
    case actionTypes.CHANGE_BREAK_LENGTH:
      return Object.assign({}, state, {
        breakLength: parseInt(action.breakLength),
      })
    case actionTypes.START_TIMER:
      return Object.assign({}, state, {
        timerLength: state.isBreak ? state.breakLength : state.pomoLength,
        isStarted: true,
      })
    case actionTypes.PAUSE_TIMER:
      return Object.assign({}, state, {
        interval: null,
      })
    case actionTypes.RESET_TIMER:
      return Object.assign({}, state, {
        interval: null,
        elapsedTime: 0,
        timerLength: state.isBreak ? state.breakLength: state.pomoLength,
        isStarted: false,
      })
    case actionTypes.TIMER_EXPIRE:
      return Object.assign({}, state, {
        isBreak: !state.isBreak,
        elapsedTime: 0,
        totalPomos: state.isBreak ? state.totalPomos : state.totalPomos + 1,
        timerLength: !state.isBreak ? state.breakLength : state.pomoLength,
      })
    case actionTypes.TICK:
      return Object.assign({}, state, {
        elapsedTime: state.elapsedTime + 1,
        interval: action.interval,
      })
    default:
      return state
  }
}


