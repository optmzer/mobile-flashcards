import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FlashCard from './components/FlashCard'


console.ignoredYellowBox = ['Remote debugger']

export default class App extends React.Component {
  render() {
    console.log("L8 App made react-native 0.52 work ");
    return (
      <View style={styles.container}>
        <Text>{"\n"}</Text>
        <FlashCard />
        <Text>{"\n"}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
