import * as TYPES from './types'
import { AsyncStorage } from 'react-native'
import {
  convertObjectToArray,
  FLASH_CARD_STORAGE_KEY,
} from '../utils/helpers'
import { getDeckAction } from './deck_actions'
import * as _ from 'underscore'

export function getCardAction(deckId, card){
  return {
    type: TYPES.GET_CARD,
    deckId, deckId,
    cardId: card.cardId,
    card: card,
  }
}

export function saveCardAction(deckId, card){
  let newCard = {
      cardId: Date.now(),
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
          AsyncStorage.mergeItem(
            FLASH_CARD_STORAGE_KEY,
            JSON.stringify(data),
            (err) => err ? console.error("L37 card_actions writing into AsyncStorage", err) : null
          )
          dispatch(getDeckAction(deckId))
        }
      }
    )
    return dispatch(saveCard(card))
  }
}

function saveCard(card){
  return {
    type: TYPES.SAVE_CARD,
    card: card,
  }
}


export function deleteCardAction(deckId, cardId){
  return function(dispatch){
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        if(err){
          console.error("L19 deck_actions Error geting Item from AsyncStorage.", err)
        }
        if(decks){
          //Find card by cardId
          let data = JSON.parse(decks)
          Object.keys(data).map(key => {
            //If deckId match add question
            if(!_.isEmpty(data[key].questions)){
              //Filter out deleted card
              let newQuestions = data[key].questions.filter(item.cardId !== cardId)
              //save new set of Questions
              data[key].questions = newQuestions
            }
          })
          //Write into AsyncStorage
          AsyncStorage.mergeItem(
            FLASH_CARD_STORAGE_KEY,
            JSON.stringify(data),
            (err) => err ? console.error("L37 card_actions writing into AsyncStorage", err) : null
          )
          //Renew Deck
          dispatch(getDeckAction(deckId))
        }
      }
    )
  }
}

function deleteCard(cardId){

  return {
    type: TYPES.DELETE_CARD,
    cardId: cardId,
  }
}

// export function getNextCardAction(currentCardId){
//   return {
//     type: TYPES.GET_NEXT_CARD,
//     currentCardId: currentCardId,
//   }
// }
//
// export function getPreviousCardAction(currentCardId){
//   return {
//     type: TYPES.GET_PREV_CARD,
//     currentCardId: currentCardId,
//   }
// }
