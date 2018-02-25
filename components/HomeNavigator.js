import React from 'react'
import { Platform } from 'react-native'
import { StackNavigator, TabNavigator } from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Deck from './Deck'
import FlashCard from './FlashCard'
import HomeScreen from './HomeScreen'
import Quiz from './Quiz'
import DeckTabs from './DeckTabs'

export default HomeNavigator = StackNavigator({
    Home: {
      screen: DeckTabs,
    }, //Home
    Deck: {
      screen: Deck,
      navigationOptions: {
        title: "Deck",
        headerTintColor: "#2b94e5",
        headerStyle: {
          //backgroundColor: "",
        }
      }//navigationOptions
    }, //Deck
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        title: "Add Card",
        headerTintColor: "#2b94e5",
        headerStyle: {
          //backgroundColor: "",
        }
      } //navigationOptions
    },//AddCard
    FlashCard: {
      screen: FlashCard,
      navigationOptions: {
        // headerLeft: <MaterialIcons name-"arrow-left" size={30}/>,
        // headerRight: <MaterialIcons name="menu" size={30}/>,
        title: "Flash Card",
        headerTintColor: "#2b94e5",
        headerStyle: {
          //backgroundColor: "",
        },
      } //navigationOptions
    }, //FlashCard
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        title: "Quiz",
      }
    },//Quiz
  })