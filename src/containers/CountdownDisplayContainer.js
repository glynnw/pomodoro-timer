import {connect} from 'react-redux'
import CountdownDisplay from '../components/CountdownDisplay'
import {calculateTimeLeft} from '../utils/TimerUtils'

const mapStateToCountdownDisplayProps = ({isBreak, totalPomos, timerLength, elapsedTime}) =>
  ({
    isBreak,
    timeLeft: calculateTimeLeft(timerLength, elapsedTime),
    totalPomos,
  })

export default connect(mapStateToCountdownDisplayProps)(CountdownDisplay)
