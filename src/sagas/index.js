import { delay } from 'redux-saga'
import {
  cancelled, take, select,
  takeLatest, call, put,
  all, cancel, fork
} from 'redux-saga/effects'
import actions from '../actions/Actions'

// selectors
const getElapsedTime = state => state.elapsedTime
const getPomoLength = state => state.pomoLength

export function* watchStartTimer() {
  while(true) {
    yield take('START_TIMER')
    const ticker = yield fork(tickAway)
    yield take(['PAUSE_TIMER', 'TIMER_EXPIRE'])
    yield cancel(ticker)
  }
}

export function* tickAway() {
  try {
    while(true) {
      const { elapsedTime, timerLength } = yield select()

      if (elapsedTime > timerLength * 60) {
        yield put(actions.timerExpire())
        //  yield call(playTimerExpireSound)
      }
      yield call(delay, 1000)
      yield put(actions.tick())
      // yield call(playTickSound)
    }
  } finally{
    if (yield cancelled())
      console.log('pausing')
  }
}

export default function* rootSaga() {
  yield all([
    watchStartTimer()
  ])
}
