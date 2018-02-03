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
} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import FlashCard from './components/FlashCard'
import thunk from 'redux-thunk'
import reducers from './reducers'
import Home from './components/Home'
import AddDeck from './components/AddDeck'

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
      tabBarIcon: ({iconColor}) => <FontAwesome name="home" size={25} color={iconColor}/>,
    }
  },//Home
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add New Deck",
      tabBarIcon: ({iconColor}) => <FontAwesome name="plus-square-o" siae={25} color={iconColor}/>,
    }
  },//AddDeck
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
