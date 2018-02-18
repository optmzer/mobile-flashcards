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
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import thunk from 'redux-thunk'
import reducers from './reducers'
import Home from './components/Home'
import FlashCard from './components/FlashCard'
import AddDeck from './components/AddDeck'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { setLocalNotification } from './utils/helpers'

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

const HomeNavigator = StackNavigator({
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

// <FlashCard />

class App extends React.Component {

  componentDidMount(){
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
            <MyStatusBar
              backgroundColor={'#fff'}
              barStyle="light-content"
            />
            <HomeNavigator/>
          </View>
      </Provider>
    )
  }
}//class App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

export default App
