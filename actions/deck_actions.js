import * as TYPES from './types'
import { AsyncStorage } from 'react-native'
import {
  convertObjectToArray,
  FLASH_CARD_STORAGE_KEY,
} from '../utils/helpers'

export function getAllDecksAction(){
  AsyncStorage.getAllKeys((err, keys) => {
    if(err){
      console.error("L11 error getting keys from AsyncStorage. ", err)
    }
    // console.log("L13 deck_actions AsyncStorage keys. ", keys)
  })
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
  // console.log("L34 getDeckAction deckId =", deckId)

  return function(dispatch){
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        if(err){
          console.error("L19 deck_actions Error geting Item from AsyncStorage.", err)
        }
        if(decks){
          let data = JSON.parse(decks)
          let deck = {}
          //Find matching Deck by deckId
          Object.keys(data).map((key, index) =>{
            if(data[key].deckId === deckId){
              deck = data[key]
            }
          })
          //dispatch Deck
          return dispatch(getDeck(deck))
        }
      }
    )
  }
}//getDeckAction()

function getDeck(deck){
  // console.log("L59 deck_actions getDeck = ", deck)
  return {
    type: TYPES.GET_DECK,
    deck: deck,
  }
}//getDeck()

export function deleteDeckAction(deckId){
  return function(dispatch){
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        if(err){
          console.error("L70 deck_actions Error geting Item from AsyncStorage.", err)
        }
        if(decks){
          let data = JSON.parse(decks)

          //Make new object without deck containing deckId
          let newDecks = {}
          Object.keys(data).map((key, index) => {
            if(data[key].deckId !== deckId){
              newDecks[key] = data[key]
            }
          })

          //Write new object into AsyncStorage
          AsyncStorage.setItem(
            FLASH_CARD_STORAGE_KEY,
            JSON.stringify(newDecks),
            (err) => err ? console.error("L83 deleteDeckAction Error writing into AsyncStorage = ", err) : null
          )
          //Rerender Home element
          return dispatch(getAllDecksAction())
        }
      }
    )
  }
}//deleteDeckAction()

function deleteDeck(){
  return {
    type: TYPES.DELETE_DECK,
  }
}//deleteDeck()

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
        //Add deck to an object
        let newDecks = JSON.parse(decks)
        newDecks[deck.title] = deck
        // console.log("L82 addNewDeckAction = ", newDecks)
        //Write into AsyncStorage
        AsyncStorage.setItem(
          FLASH_CARD_STORAGE_KEY,
          JSON.stringify(newDecks),
          (err) => err ? console.error("L84 addNewDeckAction error writing Deck to storage", err) : null
        )
      return dispatch(getDeck(deck))
    }) //Do stuff with data.
  }
}

function addNewDeck(deck){//Not used for now
  return {
    type: TYPES.SAVE_DECK,
    deck: deck,
  }
}
