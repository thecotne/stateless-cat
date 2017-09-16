import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistState } from 'helpers/state'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import reducers from 'reducers'
import thunk from 'redux-thunk'

export const browserHistory = createHistory()

export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(
    thunk,
    routerMiddleware(browserHistory)
  ),
  persistState()
))
