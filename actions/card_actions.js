import * as TYPES from './types'

export function getCardAction(cardId){
  return {
    type: TYPES.GET_CARD,
    cardId: cardId,
  }
}
export function saveCardAction(card){
  return {
    type: TYPES.SAVE_CARD,
    card: card,
  }
}
export function deleteCardAction(cardId){
  return {
    type: TYPES.DELETE_CARD,
    cardId: cardId,
  }
}
