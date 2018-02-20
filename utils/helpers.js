import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASH_CARD_STORAGE_KEY = "flashcards:decks"
export const FLASH_CARD_NOTIFICATIONS_KEY = "flashcards:notifications"


export function convertObjectToArray(obj){
  return Object.keys(obj).map(key => {
            return obj[key]
          })
}

// export function setTestData(){
//   AsyncStorage.removeItem(FLASH_CARD_STORAGE_KEY)
//   return AsyncStorage.setItem(FLASH_CARD_STORAGE_KEY, JSON.stringify(cardStorage))
// }//setTestData()

// export const cardStorage = {
//   React: {
//     deckId: Date.now() + "#!React",
//     title: 'React',
//     questions: [
//       {
//         cardId: 1,
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         cardId: 2,
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
  // JavaScript: {
  //   deckId: Date.now() + "#!JavaScript",
  //   title: 'JavaScript',
  //   questions: [
  //     {
  //       cardId: 3,
  //       question: 'What is a closure?',
  //       answer: 'The combination of a function and the lexical environment within which that function was declared.'
  //     }
  //   ]
  // }
// }//const cardStorage

export function clearLocalNotification(){
  return AsyncStorage.removeItem(FLASH_CARD_NOTIFICATIONS_KEY, (err) => {
    if(err === null){
      Notifications.cancelAllScheduledNotificationsAsync()
    } else {
      console.error("Error in clearLocalNotification - ", err)
    }
  })
}

function createNotification(){
  return {
    title: "Your daily study reminder.",
    body: "Practice is your key to Success in life",
    ios: {
      sound: true,
    },
    android: {//Android
      sound: true,
      priority: "high",
      sticky: false,
      vibrate: true,
    },
  }
}//createNotification()

export function setLocalNotification(){
  AsyncStorage.getItem(
    FLASH_CARD_NOTIFICATIONS_KEY,
    (err, data) => {
      let notifications = JSON.parse(data)
      if(err){
        console.error("L73 helpers Error geting Item from AsyncStorage.", err)
      }
      if(data === null){
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({status}) => {
            if(status === "granted"){
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrowNotice = new Date()
              tomorrowNotice.setDate(tomorrowNotice.getDate() + 1)
              tomorrowNotice.setHours(11)
              tomorrowNotice.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrowNotice,
                  repead: "day",
                }
              )
              AsyncStorage.setItem(
                FLASH_CARD_NOTIFICATIONS_KEY,
                JSON.stringify(true),
              )
            }//if("granted")
          })//.then()
      }//if
    }
  )//.getItem
}//setLocalNotification()
