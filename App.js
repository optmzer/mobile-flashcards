import React from 'react'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'
import FlashCard from './components/FlashCard'
import thunk from 'redux-thunk'
import reducers from './reducers'
import Home from './components/Home'

console.ignoredYellowBox = ['Remote debugger']

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk)
  )
)
// <FlashCard />

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
          <View style={styles.container}>
            <Text>{"\n"}</Text>
            <Home/>
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
