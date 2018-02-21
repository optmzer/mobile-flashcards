import { combineReducers } from 'redux'
import { quizReducer } from './quiz_reducers'
import { getAllDecksReducer, getDeckReducer } from './deck_reducers'
import { getCardReducer } from './card_reducers'


export default combineReducers({
  getAllDecksReducer,
  getCardReducer,
  getDeckReducer,
  quizReducer,
})
