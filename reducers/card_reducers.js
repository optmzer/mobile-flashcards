import * as TYPES from '../actions/types'

// ====== CARD REDUCERS ======

export function getCardReducer(state, action){
    switch (action.type) {
      case TYPES.GET_CARD:
        return {
          deckId: action.deckId,
          cardId: action.card.cardId,
          card: action.card
        }
      default:
        return {...state}
    }
  }//getCardReducer()