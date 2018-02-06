import {AsyncStorage} from 'react-native'

export const FLASH_CARD_STORAGE_KEY = "flashcards:decks"

export function convertObjectToArray(obj){
  return Object.keys(obj).map(key => {
            return obj[key]
          })
}

// export function getAllDecks(){
//   return AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY)
// }

/**
Takes in title: string and adds empty cart to
AsyncStorage.
#! - is a token to split title and date if I ever
want to use it.
*/
export function addNewDeck(deck_title){
  let deck = {
    deckId: Date.now(),
    title: deck_title,
    questions: []
  }
  //get Decks from storage and stringify them
  AsyncStorage.getItem(FLASH_CARD_STORAGE_KEY,
    (err, decks) => {
      if (err) { //show errors if any
        return console.error("L30 helpers addNewDeck. Cannot add new Deck ", err)
      }
      //Add deck to object
      let newDecks = JSON.parse(decks)
      newDecks[deck_title] = deck //Creates an Error. Cannot find deckId
      console.log("L35 helpers newDecks = ", newDecks)
      //Write into AsyncStorage
      AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY,
      JSON.stringify(newDecks),
      (err) => err ? console.error("L36 helpers addNewDeck error writing Deck to storage", err) : null
      )
    }) //Do stuff with data.

}//addNewDeck()

/**
Takes in card: object and merges it into a Deck
in AsyncStorage.
*/
export function addNewCard(deckId, card){
  // let card = {
  //   cardId: Date.now(),
  //   question: "",
  //   answer: ""
  // }

  AsyncStorage.mergeItem(deckId, card)
  .then(error =>
  console.error("L40 helpers addNewCard. Error while merging new card into AsyncStorage.", error))

}//addNewCard()

export function deleteCard(cardId){
  //TODO: figure out how to delete a Card from
  //Array.filter ???
}

export function deleteDeck(deckId){
  AsyncStorage.removeItem(deckId, (error) =>
  console.error("L49 deleteDeck. Error deleting Deck from AsyncStorage. ", error))
}

/**
Fill in AsyncStorage with testdata.
Delete when finish building.
*/
export function setTestData(){
  // AsyncStorage.removeItem(FLASH_CARD_STORAGE_KEY)
  return AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(cardStorage))
}//setTestData()

export const cardStorage = {
  React: {
    deckId: Date.now() + "#!React",
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    deckId: Date.now() + "#!JavaScript",
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}//const cardStorage
