import {Provider, connect} from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import numeral from 'numeral' 
import {store} from './store/StoreConfiguration'
import PomodoroTimer from './components/PomodoroTimer'

ReactDOM.render(
  <Provider store={store}>
    <PomodoroTimer />
  </Provider>,
  document.getElementById('container'))
