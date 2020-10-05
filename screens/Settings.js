import React, { Component } from 'react'
import { Text, View } from 'react-native'
import MyHeader from '../components/Header'

export default class Settings extends Component {
  render() {
    return (
      <>
        <MyHeader navigation={this.props.navigation} />
        <View>
          <Text> Settings </Text>
        </View>
      </>
    )
  }
}
