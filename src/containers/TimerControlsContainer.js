import {connect} from 'react-redux'
import TimerControls from '../components/TimerControls'
import actions from '../actions/Actions'

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

export default connect(mapStateToTimerControls, mapDispatchToTimerControls)(TimerControls)
