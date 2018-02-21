import * as TYPES from './types'
import { AsyncStorage } from 'react-native'
import {
  convertObjectToArray,
  FLASH_CARD_STORAGE_KEY,
} from '../utils/helpers'

/**
 * Gets all decks from AsyncStorage at a specific key
 * if successful returns action with object of decks. 
 */
export function getAllDecksAction(){
  AsyncStorage.getAllKeys((err, keys) => {
    if(err){
      console.error("L11 error getting keys from AsyncStorage. ", err)
    }
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

//=====================================

/**
 * 
 * @param {string} deckId 
 * Gets Deck with deckId from AsyncStorage
 * if successful 
 * returns dispatch(getDeck(deck)) action 
 */
export function getDeckAction(deckId){
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
  return {
    type: TYPES.GET_DECK,
    deck: deck,
  }
}//getDeck()

//=====================================

/**
 * 
 * @param {string} deckId 
 * Delets Deck with specified deckId from AsyncStorage
 * If successful 
 * returns dispatch(getAllDecksAction())
 */
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

//=====================================

/**
 * 
 * @param {obj} deck 
 * Adds pushes deck into AsyncStorage
 * if successful calls dispatch(getDeck(deck))
 * then 
 * returns dispatch(getAllDecksAction())
 */
export function addNewDeckAction(deck){
  return function(dispatch){
    //get Decks from storage and stringify them
    AsyncStorage.getItem(
      FLASH_CARD_STORAGE_KEY,
      (err, decks) => {
        if (err) { //show errors if any
          return console.error("L121 addNewDeckAction. Cannot add new Deck ", err)
        }
        //Add deck to an object
        let newDecks = JSON.parse(decks)
        if(newDecks === null){
          newDecks = { }
          newDecks[deck.title] = deck
        } else {
          newDecks[deck.title] = deck
        }
        //Write into AsyncStorage
        AsyncStorage.setItem(
          FLASH_CARD_STORAGE_KEY,
          JSON.stringify(newDecks),
          (err) => {err
            ? console.error("L131 addNewDeckAction error writing Deck to storage", err)
            : dispatch(getDeck(deck))
          }
        )
      return dispatch(getAllDecksAction())
    }) //Do stuff with data.
  }
}