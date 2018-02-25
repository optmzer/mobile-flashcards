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
import { Constants } from 'expo'
import thunk from 'redux-thunk'
import reducers from './reducers'
import HomeNavigator from './components/HomeNavigator'
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