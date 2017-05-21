import * as constants from '../constants/Constants'
import numeral from 'numeral'

export function calculateTimeLeft(timerLength, elapsedTime) {
  const timeLeft = (timerLength * 60)
          - elapsedTime
  const minutes = Math.floor(timeLeft / constants.SECS_IN_MIN)
  const seconds = Math.floor(timeLeft % constants.SECS_IN_MIN)
  return `${numeral(minutes).format('00')}:` +
    `${numeral(seconds.toFixed(2)).format('00')}`
}
