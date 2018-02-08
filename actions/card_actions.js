import * as TYPES from './types'
import { AsyncStorage } from 'react-native'
import {
  convertObjectToArray,
  FLASH_CARD_STORAGE_KEY,
} from '../utils/helpers'
import { getDeckAction } from './deck_actions'

export function getCardAction(cardId){
  return {
    type: TYPES.GET_CARD,
    cardId: cardId,
  }
}

export function saveCardAction(deckId, card){
  // console.log("L16 card_actions deckId= "+deckId+", card=", card)
  let newCard = {
      qId: Date.now(),
      question: card.question,
      answer: card.answer,
  }
  return function(dispatch){
    //Get the Decks
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        if(err){
          console.error("L19 deck_actions Error geting Item from AsyncStorage.", err)
        }
        if(decks){
          //Find deck by deckId
          let data = JSON.parse(decks)
          Object.keys(data).map(key => {
            //If deckId match add question
            if(data[key].deckId === deckId){
              data[key].questions.push(newCard)
            }
          })
          //Write into AsyncStorage
          console.log("L40 saveCardAction data", data)
          AsyncStorage.mergeItem(
            FLASH_CARD_STORAGE_KEY,
            JSON.stringify(data),
            (err) => err ? console.error("L37 card_actions writing into AsyncStorage", err) : null
          )
          dispatch(getDeckAction(deckId))

        }
      }
    )
    /**
    TODO: refresh all cards use FlatList to show cards in the Deck
    */
    return dispatch(saveCard(card))
  }
}

function saveCard(card){
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
