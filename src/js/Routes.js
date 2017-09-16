import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import { browserHistory } from 'stateOfArt'
import { routes } from 'modules'
import React from 'react'

export default () =>
  <ConnectedRouter history={browserHistory}>
    <div className='app-router'>
      { routes.map((route, index) => <Route {... route} key={index} />) }
    </div>
  </ConnectedRouter>
