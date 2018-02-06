import * as TYPES from './types'
import { AsyncStorage } from 'react-native'
import {
  convertObjectToArray,
  FLASH_CARD_STORAGE_KEY,
} from '../utils/helpers'

export function getAllDecksAction(){
  return function(dispatch){
    return (
      AsyncStorage.getItem(
        FLASH_CARD_STORAGE_KEY,
        (err, decks) => {
          if(err){
            console.error("L19 deck_actions Error geting Item from AsyncStorage.", err)
          }
          if(decks){
            dispatch(getAllDecks(convertObjectToArray(JSON.parse(decks))))
          }
        }
      )
    )
  }
}//getAllDecksAction()

function getAllDecks(decks){
  return{
    type: TYPES.GET_ALL_DECKS,
    decks: decks
  }
}//getAllDecksAction()

export function getDeckAction(deckId){
  return function(dispatch){
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        if(err){
          console.error("L19 deck_actions Error geting Item from AsyncStorage.", err)
        }
        if(decks){
          let data = convertObjectToArray(JSON.parse(decks))
          let deck = data.filter((item, index) => {
              if(item.deckId === deckId){
                return true
              }
          })
          return dispatch(getDeck(deck))
        }
      }
    )
  }
}//getDeckAction()

function getDeck(deck){
  console.log("L57 deck_actions getDeck = ", deck)

  return {
    type: TYPES.GET_DECK,
    deck: deck,
  }
}

export function deleteDeckAction(deckId){
  return {
    type: TYPES.DELETE_DECK,
    deckId: deckId,
  }
}

export function addNewDeckAction(deck){
  // console.log("L47 addNewDeckAction deck = ", deck)
  return function(dispatch){
    //get Decks from storage and stringify them
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        if (err) { //show errors if any
          return console.error("L74 addNewDeckAction. Cannot add new Deck ", err)
        }
        //Add deck to object
        let newDecks = JSON.parse(decks)
        newDecks[deck.title] = deck //Creates an Error. Cannot find deckId
        // console.log("L82 addNewDeckAction = ", newDecks)
        //Write into AsyncStorage
        AsyncStorage.setItem(
          FLASH_CARD_STORAGE_KEY,
        JSON.stringify(newDecks),
        (err) => err ? console.error("L84 addNewDeckAction error writing Deck to storage", err) : null
        )
        return dispatch(getAllDecksAction())
      }) //Do stuff with data.
  }
}

function addNewDeck(deck){//Not used for now
  return {
    type: TYPES.SAVE_DECK,
    deck: deck,
  }
}
