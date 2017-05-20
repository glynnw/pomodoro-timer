const {Provider, connect} = require('react-redux')
const {createStore} = require('redux')
const ReactDOM = require('react-dom')
const React = require('react')
const numeral = require('numeral') 

const CHANGE_POMO_LENGTH = "change_pomo_length"
const CHANGE_BREAK_LENGTH = "change_break_length"
const START_TIMER = "start_timer"
const PAUSE_TIMER = "pause_timer"
const RESET_TIMER = "reset_timer"
const TIMER_EXPIRE = "timer_expire"
const TICK = "tick"
const SECS_IN_MIN = 60

/* Presentation Component: DurationSetting */
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

/* Container Component: BreakDurationSetting */
const mapStateToSettings = ({breakLength, pomoLength}) =>
  ({
    breakLength,
    pomoLength,
  })

const mapDispatchToSettings = (dispatch) =>
  ({
    handleBreakLength(e) {
      dispatch(actions.changeBreakLength(e.target.value))
    },
    handlePomoLength(e) {
      dispatch(actions.changePomoLength(e.target.value))
    },
  })

const SettingsContainer =
      connect(mapStateToSettings,
              mapDispatchToSettings)(Settings)

/* Presentation Component: TimerControls */
const TimerControls = ({onPauseClick, onStartClick, onResetClick, elapsedTime, timerLength, isStarted, interval}) => <div>
    <button onClick={() => onStartClick(elapsedTime, timerLength, isStarted, interval)}>Start</button>
    <button onClick={() => onPauseClick(interval)}>Pause</button>
    <button onClick={() => onResetClick(interval)}>Reset</button>
  </div>

/* Container Component: TimerControlsContainer */
const mapStateToTimerControls = ({elapsedTime, timerLength, isStarted, interval}) => ({
  elapsedTime,
  timerLength,
  isStarted,
  interval
})

const mapDispatchToTimerControls = (dispatch) => ({
  onStartClick(elapsedTime, timerLength, isStarted) {
    if(!isStarted && isStarted != undefined) {
      dispatch(actions.startTimer())
      const interval = setInterval(() => {
          dispatch(actions.tick(interval, elapsedTime, timerLength))
      }, 1000)
    }
  },
  onPauseClick(interval) {
    clearInterval(interval)
    dispatch(actions.pause())
  },
  onResetClick(interval) {
    clearInterval(interval)
    dispatch(actions.reset())
  },
})

const TimerControlsContainer = connect(mapStateToTimerControls, mapDispatchToTimerControls)(TimerControls)

/* Presentation Component: CountDownDisplay */
const CountDownDisplay  = ({totalPomos, isBreak, timeLeft}) =><div>
     <h1>Pomodoro Timer</h1>
      <h2>{isBreak ? "Break:" : "Pomo:"}</h2>
      <h3>Total Pomos Completed: {totalPomos}</h3>
    <p>{timeLeft}</p>
   </div>

/* Container Component: CountDownDisplayContainer */
const mapStateToCountDownDisplayProps = ({isBreak, totalPomos, timerLength, elapsedTime}) =>
  ({
    isBreak,
    timeLeft: calculateTimeLeft(timerLength, elapsedTime),
    totalPomos,
  })

const CountDownDisplayContainer = connect(mapStateToCountDownDisplayProps)(CountDownDisplay)

/* Presentation Component: PomodoroTimer */
function calculateTimeLeft(timerLength, elapsedTime) {
  const timeLeft = (timerLength * 60)
          - elapsedTime
  const minutes = Math.floor(timeLeft / SECS_IN_MIN)
  const seconds = Math.floor(timeLeft % SECS_IN_MIN)
  return `${numeral(minutes).format('00')}:` +
    `${numeral(seconds.toFixed(2)).format('00')}`
}

const PomodoroTimer = () =>
  <div>
    <CountDownDisplayContainer />
    <TimerControlsContainer />
    <SettingsContainer />
  </div>

/* Actions: */
const actions = {
  changePomoLength: (pomoLength) =>
    ({ type: CHANGE_POMO_LENGTH, pomoLength }),
  changeBreakLength: (breakLength) =>
    ({ type: CHANGE_BREAK_LENGTH, breakLength }),
  startTimer: (startTime) =>
    ({ type: START_TIMER}),
  pause: () =>
    ({ type: PAUSE_TIMER }),
  reset: () => ({ type: RESET_TIMER }),
  tick: (interval, elapsedTime, timerLength) => ({ type: TICK, interval }),
  timerExpire: () => ({ type: TIMER_EXPIRE }),
}

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
const reducer = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_POMO_LENGTH:
      return Object.assign({}, state, {
        pomoLength: parseInt(action.pomoLength),
      })
    case CHANGE_BREAK_LENGTH:
      return Object.assign({}, state, {
        breakLength: parseInt(action.breakLength),
      })
    case START_TIMER:
      return Object.assign({}, state, {
        timerLength: state.isBreak ? state.breakLength : state.pomoLength,
        isStarted: true,
      })
    case PAUSE_TIMER:
      return Object.assign({}, state, {
        interval: null,
      })
    case RESET_TIMER:
      return Object.assign({}, state, {
        interval: null,
        elapsedTime: 0,
        timerLength: state.isBreak ? state.breakLength: state.pomoLength,
        isStarted: false,
      })
    case TIMER_EXPIRE:
      return Object.assign({}, state, {
        isBreak: !state.isBreak,
        elapsedTime: 0,
        totalPomos: state.isBreak ? state.totalPomos : state.totalPomos + 1,
        timerLength: !state.isBreak ? state.breakLength : state.pomoLength,
      })
    case TICK:
      return Object.assign({}, state, {
        elapsedTime: state.elapsedTime + 1,
        interval: action.interval,
      })
    default:
      return state
  }
}

//const store = createStore(reducer)
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const checkTimerListener = () => {
  if(store.getState().elapsedTime > store.getState().pomoLength * 60) {
    store.dispatch(actions.timerExpire())
  }
}

store.subscribe(checkTimerListener)

ReactDOM.render(
  <Provider store={store}>
    <PomodoroTimer />
  </Provider>,
  document.getElementById('container'))
