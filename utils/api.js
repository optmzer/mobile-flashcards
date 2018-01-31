import { AsyncStorage } from 'react-native'
import * as HELPERS from './helpers'


export const FLASH_CARD_STORAGE_KEY = "flashcards:decks"

//gets all the decks from AsyncStorage
//Returns Promise
export async function getAllDecks(){
  return await AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY)
}//getDecks()

export function getDeck(){
}

export function saveDeck(deckTitle){

}

export function addCardToDeck(question){

}

export function deleteDeck(deckTitle){

}

export function deleteCard(question){

}
