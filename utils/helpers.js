import {AsyncStorage} from 'react-native'

export const FLASH_CARD_STORAGE_KEY = "flashcards:decks"

export function convertObjectToArray(obj){
  return Object.keys(obj).map(key => {
            return obj[key]
          })
}

export function setTestData(){
  AsyncStorage.removeItem(FLASH_CARD_STORAGE_KEY)
  return AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(cardStorage))
}//setTestData()

export const cardStorage = {
  React: {
    deckId: Date.now() + "#!React",
    title: 'React',
    questions: [
      {
        qId: 1,
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        qId: 2,
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
        qId: 3,
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}//const cardStorage
