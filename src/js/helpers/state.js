import { lensPick } from 'helpers'
import { handleActions as reduxActionsHandleActions } from 'redux-actions'
import PropTypes from 'prop-types'
import R from 'ramda'
import _ from 'lodash'
import reduxLocalstorage from 'redux-localstorage'

export const handleActions = (reducers, defaultState, types = null, moduleName = '[reducer]') => {
  const actionHandler = reduxActionsHandleActions(reducers, defaultState)

  return (state, action) => {
    const newState = actionHandler(_.defaultsDeep(state, defaultState), action)

    PropTypes.checkPropTypes(types, newState, 'prop', moduleName)

    return newState
  }
}

export const persistState = (keys = []) => reduxLocalstorage(keys, {
  slicer: (paths = []) => state => lensPick(R.map(R.lensPath, paths), state),
  serialize: subset => JSON.stringify(subset),
  deserialize: serializedData => JSON.parse(serializedData),
  merge: (initialState = {}, persistedState = {}) => _.defaultsDeep(initialState, persistedState)
})
