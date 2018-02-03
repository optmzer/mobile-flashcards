import * as TYPES from '../actions/types'
import { combineReducers } from 'redux'

// ====== DECK REDUCERS ======

function getAllDecksReducer(state, action){
  switch (action.type) {
    case TYPES.GET_ALL_DECKS:
      return {
        decks: action.decks,
      }
    default:
      return {...state}
  }
}//getAllDecksReducer()

// ====== CARD REDUCERS ======

function getCardReducer(state, action){
  switch (action.type) {
    case TYPES.GET_CARD:
      return {
        card: action.card
      }
    default:
      return {...state}
  }
}//getCardReducer()

export default combineReducers({
  getAllDecksReducer,
  getCardReducer,
})