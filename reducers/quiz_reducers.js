import * as TYPES from '../actions/types'

// ====== QUIZ REDUCERS ======

export function quizReducer(state, action){
    switch (action.type) {
      case TYPES.START_QUIZ:
        return {
          ...state,
          startQuiz: true,
          quizScore: 0,
        }
      case TYPES.FINISH_QUIZ:
        return {
          ...state,
          startQuiz: false,
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