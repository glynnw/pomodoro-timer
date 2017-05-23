import {connect} from 'react-redux'
import TimerControls from '../components/TimerControls'
import actions from '../actions/Actions'

const mapStateToTimerControls = ({elapsedTime, timerLength, isStarted }) => ({
  elapsedTime,
  timerLength,
  isStarted,
})

const mapDispatchToTimerControls = (dispatch) => ({
  onStartClick(elapsedTime, timerLength, isStarted) {
    dispatch(actions.startTimer())
  },
  onPauseClick() {
    dispatch(actions.pause())
  },
  onResetClick() {
    dispatch(actions.reset())
  },
})

export default connect(mapStateToTimerControls, mapDispatchToTimerControls)(TimerControls)
