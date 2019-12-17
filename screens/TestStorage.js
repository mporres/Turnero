import React, { Component } from 'react'
import { AppRegistry, View, Text, AsyncStorage, StyleSheet } from 'react-native'

import Input from './components/input'

const STORAGE_KEY = 'ASYNC_STORAGE_NAME_EXAMPLE'

export default class App extends Component {

  state = {name: 'World'}

  componentWillMount() {
    this.load()
  }

  load = async () => {
    try {
      const name = await AsyncStorage.getItem(STORAGE_KEY)

      if (name !== null) {
        this.setState({name})
      }
    } catch (e) {
      console.error('Failed to load .')
    }
  }

  save = async (name) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, name)

      this.setState({name})
    } catch (e) {
      console.error('Failed to save name.')
    }
  }

  render() {
    const {name} = this.state

    return (
      <View>
        <Input
          placeholder={'Escribí tu variable a guardar'}
          onSubmitEditing={this.save}
        />
        <Text style={styles.text}>
          Tu variable es {name}!
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    padding: 15,
    backgroundColor: 'skyblue',
  },
})

AppRegistry.registerComponent('App', () => App)