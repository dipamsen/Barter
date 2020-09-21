import React, { Component } from 'react'
import { View, StyleSheet, Image, ScrollView, ToastAndroid, Alert } from 'react-native'
import { Overlay } from 'react-native-elements'
import { TextInput, Text, Button, IconButton as Icon } from 'react-native-paper'
import firebase from 'firebase';
import db from '../config'

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      emailID: "",
      password: "",
      modalVisible: false
    }
  }
  login = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
      ToastAndroid.show("Logged in Successfully", ToastAndroid.SHORT);
    }).catch(err => Alert.alert("Error", err.message))
  }
  modal = (modalVisible, hideModal) => (
    // Overlay uses Modal Component and gives background gradient
    <Overlay animationType="fade" onBackdropPress={hideModal} isVisible={modalVisible} overlayStyle={styles.modal}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.subtitle}>Register</Text>
        <Text>TextInputs for Registration...</Text>
      </View>
    </Overlay>
  )
  render() {
    const { emailID, password, modalVisible } = this.state
    const setEmailID = s => this.setState({ emailID: s })
    const setPassword = s => this.setState({ password: s })
    const showModal = () => this.setState({ modalVisible: true })
    const hideModal = () => this.setState({ modalVisible: false })
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={require("../assets/logo.png")}
          style={{ width: 180, height: 140, borderRadius: 20 }}
        />
        <Text style={styles.title}> Barter </Text>
        <Text style={styles.subtitle}> Welcome! Login to Continue. </Text>
        {this.modal(modalVisible, hideModal)}
        <TextInput
          mode="outlined"
          style={{ width: "95%" }}
          label="Email ID *"
          keyboardType="email-address"
          value={emailID}
          left={<TextInput.Icon name="email" style={{ marginLeft: 6 }} />}
          onChangeText={setEmailID}
        />
        <TextInput
          mode="outlined"
          style={{ width: "95%" }}
          label="Password *"
          secureTextEntry
          left={<TextInput.Icon name="key-variant" style={{ marginLeft: 6 }} />}
          value={password}
          onChangeText={setPassword}
        />
        <Button
          mode="contained"
          style={styles.btn}
          onPress={this.login}>
          Login
        </Button>
        <Button
          mode="contained"
          style={[styles.btn, { marginTop: 5 }]}
          onPress={showModal}>
          Sign Up
        </Button>
      </ScrollView >
    )
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 40
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 10
  },
  btn: {
    width: '95%',
    marginTop: 20
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffddb6"
  },
  modal: {
    width: "80%",
    height: "60%",
    alignItems: "center"
  }
})

