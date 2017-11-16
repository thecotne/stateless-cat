import { Provider } from 'react-redux'
import { store } from 'stateOfArt'
import React from 'react'
import ReactDOM from 'react-dom'
import Routes from 'Routes'

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
)

ReactDOM.render(
  <App />,
  document.body.appendChild(document.createElement('main'))
)
