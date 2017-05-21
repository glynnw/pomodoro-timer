import {createStore} from 'redux'
import reducer from '../reducers/Reducer'
import actions from '../actions/Actions'

//const store = createStore(reducer)
export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

const checkTimerListener = () => {
  if(store.getState().elapsedTime > store.getState().pomoLength * 60) {
    store.dispatch(actions.timerExpire())
  }
}

store.subscribe(checkTimerListener)
