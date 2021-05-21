import React, { Component } from 'react'
import { StyleSheet, View, ToastAndroid, Image } from 'react-native'
import { Button, Text } from 'react-native-paper'
import { DrawerItems } from "react-navigation-drawer";
import firebase from 'firebase'

export default class Drawer extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../assets/logo.png")}
          style={{ width: 180, height: 140, borderRadius: 20, alignSelf: 'center' }}
        />
        <Text style={styles.heading}>Barter System</Text>
        <DrawerItems {...this.props} />
        <Button mode="contained" style={{ margin: 8 }} onPress={() => {
          firebase.auth().signOut();
          this.props.navigation.navigate("Login")
          ToastAndroid.show("Logged Out.", ToastAndroid.SHORT)
        }}>Sign Out
          </Button>
      </View >
    )
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  heading: {
    fontSize: 26,
    textAlign: 'center',

  }
})
