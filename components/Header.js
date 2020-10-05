import React, { Component } from 'react'
import { Text, ToastAndroid, View } from 'react-native'
import { Appbar, Menu } from 'react-native-paper'
import firebase from 'firebase'

export default class MyHeader extends Component {
  constructor() {
    super();
    this.state = {
      visible: false
    }
  }
  render() {
    const { visible } = this.state
    const showMenu = () => { this.setState({ visible: true }) }
    const hideMenu = () => { this.setState({ visible: false }) }
    return (
      <Appbar.Header>
        <Appbar.Action icon="menu" color="#fff"
        // onPress={() => this.props.navigation.openDrawer()}
        />
        <Appbar.Content title="Barter" />
        <Appbar.Action icon="bell" />
        <Menu
          visible={visible}
          onDismiss={hideMenu}
          anchor={<Appbar.Action color="#fff" icon="dots-vertical" onPress={showMenu} />}
        >
          <Menu.Item
            onPress={() => {
              firebase.auth().signOut();
              this.props.navigation.navigate("Login")
              ToastAndroid.show("Logged Out.", ToastAndroid.SHORT)
            }}
            title="Sign Out" />
          <Menu.Item
            onPress={() => { this.props.navigation.navigate("Settings") }}
            title="Settings" />
        </Menu>
      </Appbar.Header >
    )
  }
}
