import {basename, dirname} from 'path'
import R from 'ramda'

const context = require.context('./', true, /\.\/\w+\/index\.js$/)

export const modules = R.pipe(
  R.map(path => [basename(dirname(path)), context(path)]),
  R.fromPairs
)(context.keys())

export const routes = R.pipe(
  R.values,
  R.map(R.prop('routes')),
  R.unnest
)(modules)

export const reducers = R.map(R.prop('reducers'), modules)

export default {
  routes,
  reducers
}
