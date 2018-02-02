import * as TYPES from './types'
import FLASH_CARD_STORAGE_KEY from '../utils/api'


function getAllDecks(decks){
  return{
    type: TYPES.GET_ALL_DECKS,
    decks: decks
  }
}//getAllDecksAction()

export function getAllDecksAction(){
  return function(dispatch){
    return (
      AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY)
      .then(decks => dispatch(getAllDecks(JSON.parse(decks))))
    )
  }
}

export function getDeckAction(deckId){
  return {
    type: TYPES.GET_DECK,
    deckId: deckId,
  }
}//getDeckAction()

export function deleteDeckAction(deckId){
  return {
    type: TYPES.DELETE_DECK,
    deckId: deckId,
  }
}
export function saveDeckAction(deck){
  return {
    type: TYPES.SAVE_DECK,
    deck: deck,
  }
}
