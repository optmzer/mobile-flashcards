import React from 'react'
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import { Provider } from 'react-redux'
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import FlashCard from './components/FlashCard'
import thunk from 'redux-thunk'
import reducers from './reducers'
import Home from './components/Home'
import AddDeck from './components/AddDeck'
import { FontAwesome } from '@expo/vector-icons'

console.ignoredYellowBox = ['Remote debugger']

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
  )
)//createStore()

function MyStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar
        translucent
        backgroundColor={backgroundColor}
        {...props}
      />
    </View>
  )
}//MyStatusBar()

const DeckTabs = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({tintColor}) => <FontAwesome name="home" size={25} color={tintColor}/>,
    }
  },//Home
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add New Deck",
      tabBarIcon: ({tintColor}) => <FontAwesome name="plus-square-o" size={25} color={tintColor}/>,
    }
  },//AddDeck
}, {
  navigationOptions: {
    headers: null,
  },
  tabBarOptions: Platform.OS === 'ios' ?
    {
      // iOS tabBarOptions
      showLabel: true,
      activeTintColor: "#ffcc00",
      style: {
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

// <FlashCard />

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
            <MyStatusBar
              backgroundColor={'#fff'}
              barStyle="light-content"
            />
            <DeckTabs/>
          </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
