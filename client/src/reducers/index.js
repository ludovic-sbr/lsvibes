import { combineReducers } from 'redux'

// Importer tout les reducers ici
import userReducer from './user'

const rootReducer = combineReducers({
  user: userReducer,
  // importer d'autres reducers ici
})

export default rootReducer
