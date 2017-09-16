import { basename } from 'path'
import { combineReducers } from 'redux'
import { reducers as moduleReducers } from 'modules'
import R from 'ramda'

const context = require.context('./', true, /^((?!index).)*\.js$/)

const reducers = R.pipe(
  R.map(path => [basename(path, '.js'), context(path).default]),
  R.fromPairs
)(context.keys())

export default combineReducers(R.mergeAll([reducers, moduleReducers]))
