import R from 'ramda'

export const lensPick = R.curry((lenses, data) =>
  R.reduce((obj, lens) => R.set(lens, R.view(lens, data), obj), {}, lenses)
)
