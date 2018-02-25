import React from 'react'
import {
  Platform,
  View
} from 'react-native'
import {TabNavigator} from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons'
import HomeScreen from './HomeScreen'
import AddDeck from './AddDeck'

export default DeckTabs = TabNavigator({
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home",
        tabBarIcon: ({tintColor}) => <FontAwesome name="home" size={25} color={tintColor}/>,
      }
    },//HomeScreen
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add New Deck",
        tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square-o" size={25} color={tintColor}/>,
      }
    },//AddDeck
  }, {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: Platform.OS === 'ios' ?
      {
        // iOS tabBarOptions
        showLabel: true,
        activeTintColor: "#ffcc00",//Icon color
        style: {//tab color
          //backgroundColor: ,
        },
      } : {
        // Android tabBarOptions
        showIcon: true,
        showLabel: true,
        activeTintColor: "#ffcc00",
        style: {
        },
      },//tabBarOptions
  })//TabNavigator()