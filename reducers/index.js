import * as TYPES from '../actions/types'
import { combineReducers } from 'redux'

// ====== DECK REDUCERS ======

function getAllDecksReducer(state, action){
  switch (action.type) {
    case TYPES.GET_ALL_DECKS:
      return {
        decks: action.decks,
      }
    default:
      return {...state}
  }
}//getAllDecksReducer()

function getDeckReducer(state, action){
  switch (action.type) {
    case TYPES.GET_DECK:
      return {
        deck: action.deck
      }
    default:
      return {...state}
  }
}

// ====== CARD REDUCERS ======

function getCardReducer(state, action){
  // console.log("L31 getCardReducer state= ", state)
  // console.log("L32 getCardReducer action= ", action)
  switch (action.type) {
    case TYPES.GET_CARD:
      return {
        deckId: action.deckId,
        cardId: action.card.cardId,
        card: action.card
      }

    default:
      return {...state}
  }
}//getCardReducer()

// ====== QUIZ REDUCERS ======

function quizReducer(state, action){
  switch (action.type) {
    case TYPES.START_QUIZ:
      return {
        ...state,
        startQuiz: true,
        showScore: false,
      }
    case TYPES.FINISH_QUIZ:
      return {
        ...state,
        startQuiz: false,
        showScore: true,
      }
    case TYPES.HIDE_SCORE:
      return {
        ...state,
        showScore: true,
      }
    case TYPES.SET_QUIZ_SCORE:
      return {
        ...state,
        quizScore: action.quizScore,
      }
    default:
      return {...state}
  }
}

export default combineReducers({
  getAllDecksReducer,
  getCardReducer,
  getDeckReducer,
  quizReducer,
})
