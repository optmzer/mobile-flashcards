import * as TYPES from './types'

export function startQuizAction(){
  return {
    type: TYPES.START_QUIZ,
  }
}

export function finishQuizAction(){
  return {
    type: TYPES.FINISH_QUIZ,
  }
}

export function setQuizScoreAction(quizScore){
  return {
    type: TYPES.SET_QUIZ_SCORE,
    quizScore: quizScore
  }
}

export function hideScoreAction(){
  return {
    type: TYPES.HIDE_SCORE,
  }
}
