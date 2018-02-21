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

/**
 * 
 * @param {sting} deckId 
 * @param {obj} card 
 * Saves a card into a Deck object in AsyncStorage.
 */
export function saveCardAction(deckId, card){
  return function(dispatch){
    //Get the Decks
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        let newCard = {
          cardId: Date.now(),
          question: card.question,
          answer: card.answer,
        }
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

function saveCard(card){//This action does not do anything yet
  return {
    type: TYPES.SAVE_CARD,
    card: card,
  }
}

/**
 * 
 * @param {string} deckId 
 * @param {obj} card 
 * Saves edited card into the same Deck.
 */
export function saveEditedCardAction(deckId, card){
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
          Object.keys(data).forEach(key => {
            //If deckId match find card and add new questions
            if(data[key].deckId === deckId){
              data[key].questions.forEach((item) => {
                if(item.cardId === card.cardId){
                  item.question = card.question
                  item.answer = card.answer
                  console.log("L83 saveEditedCardAction = ", item)
                }
              })//forEach
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
  }
}//saveEditedCardAction()

/**
 * 
 * @param {string} deckId 
 * @param {string} cardId 
 * Delete card from the deck
 */
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
              let newQuestions = data[key].questions.filter((card) => card.cardId !== cardId)
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
          dispatch(getDeckAction(deckId))
        }
      }
    )
    //Renew Deck
    return dispatch(deleteCard(deckId))
  }//dispatch()
}//deleteCardAction()

function deleteCard(cardId){
  return {
    type: TYPES.DELETE_CARD,
    cardId: cardId,
  }
}