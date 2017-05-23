import { delay } from 'redux-saga'
import { take, select, takeLatest, call, put, all } from 'redux-saga/effects'
import actions from '../actions/Actions'

// selectors
const getElapsedTime = state => state.elapsedTime
const getPomoLength = state => state.pomoLength

export function* watchStartTimer() {
  yield takeLatest('START_TIMER', tickAway)
}

export function* watchTick() {
  yield takeLatest('TICK', tickAway)
}

export function* watchPauseTimer() {
  while(true) {
    const { isStarted } = yield select()
    yield take('PAUSE_TIMER')
    console.log(isStarted)
  }
}

export function* tickAway() {
  let { isStarted, elapsedTime, timerLength } = yield select()

  console.log(isStarted)

  if (isStarted) {
    if (elapsedTime > timerLength * 60) {
      yield put(actions.timerExpire())
      // yield call(playTimerExpireSound)
    }

    yield call(delay, 1000)
    yield put(actions.tick())
    // yield call(playTickSound)
  }
}

export default function* rootSaga() {
  yield all([
    watchTick(),
    watchStartTimer(),
    watchPauseTimer()
  ])
}
