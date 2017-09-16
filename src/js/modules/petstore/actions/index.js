import {
  FETCH_PET_REQUEST
} from './types'

import { createAction } from 'redux-actions'

export const fetchPetRequestAction = createAction(FETCH_PET_REQUEST)
