import {AsyncStorage} from 'react-native'
import { Notifications, Permissions } from 'expo'

export const FLASH_CARD_STORAGE_KEY = "flashcards:decks"
export const FLASH_CARD_NOTIFICATIONS_KEY = "flashcards:notifications"


/**
 * 
 * @param {*} obj 
 * Converts a plain object into an array of objects.
 */
export function convertObjectToArray(obj){
  return Object.keys(obj).map(key => {
            return obj[key]
          })
}

/**
 * Clears all local notifications with this key.
 */
export function clearLocalNotification(){
  return AsyncStorage.removeItem(FLASH_CARD_NOTIFICATIONS_KEY, (err) => {
    if(err === null){
      Notifications.cancelAllScheduledNotificationsAsync()
    } else {
      console.error("Error in clearLocalNotification - ", err)
    }
  })
}

/**
 * Creates notification object
 */
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

/**
 * Sets notification object in the AsyncStorage at 8am every day 
 * if a deck is not opened.
 * Hard coded for now.
 */
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
              //Hard coded notification time at 8:00 AM every day.
              tomorrowNotice.setHours(8)
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
