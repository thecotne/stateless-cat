import { FETCH_PET_REQUEST } from '../actions/types'
import { handleActions } from 'helpers/state'
import { moduleName } from '../config'
import PropTypes from 'prop-types'

const initialState = {
  pet: null
}

const types = {
  pet: PropTypes.string
}

const actionHandlers = {
  [FETCH_PET_REQUEST]: state => state
}

export default handleActions(actionHandlers, initialState, types, moduleName)
