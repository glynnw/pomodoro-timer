import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducer from '../reducers/Reducer'
import actions from '../actions/Actions'
import rootSaga from '../sagas'

const middleware = [] 

if (window.__REDUX_DEVTOOLS_EXTENSION__)
  middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__())

const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)

export const store = createStore(
  reducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))

sagaMiddleware.run(rootSaga)
// const checkTimerListener = () => {
//   if(store.getState().elapsedTime > store.getState().pomoLength * 60) {
//     store.dispatch(actions.timerExpire())
//   }
// }

// store.subscribe(checkTimerListener)
