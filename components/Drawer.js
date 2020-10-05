import React, { Component } from 'react'
import { Text, StyleSheet, View, ToastAndroid } from 'react-native'
import { Button } from 'react-native-paper'
import { DrawerItems } from "react-navigation-drawer";
import firebase from 'firebase'

export default class Drawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <DrawerItems {...this.props} />
        <Button mode="contained" style={{ margin: 8 }} onPress={() => {
          firebase.auth().signOut();
          this.props.navigation.navigate("Login")
          ToastAndroid.show("Logged Out.", ToastAndroid.SHORT)
        }}>
          Sign Out
          </Button>
      </View >
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20
  }
})
