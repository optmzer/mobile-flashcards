import * as TYPES from '../actions/types'

// ====== DECK REDUCERS ======

export function getAllDecksReducer(state, action){
    switch (action.type) {
      case TYPES.GET_ALL_DECKS:
        return {
          decks: action.decks,
        }
      default:
        return {...state}
    }
  }//getAllDecksReducer()
  
export function getDeckReducer(state, action){
    switch (action.type) {
        case TYPES.GET_DECK:
            return {
                deck: action.deck
            }
        default:
            return {...state}
    }
}