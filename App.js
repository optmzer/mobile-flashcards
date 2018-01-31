import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FlashCard from './components/FlashCard'


console.ignoredYellowBox = ['Remote debugger']

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>{"\n"}</Text>
        <FlashCard />
      </View>
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
