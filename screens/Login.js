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
      modalVisible: false,
      name: "",
      contact: "",
      confirmPass: "",
      address: ""
    }
  }
  componentDidMount() {
    // Listen for changes in "auth state"
    this.loginListener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        ToastAndroid.show("Logged in Successfully", ToastAndroid.SHORT);
      }
    })
  }
  componentWillUnmount() {
    // Stop listening for "auth state" changes
    this.loginListener && this.loginListener()
  }
  login = () => {
    const { emailID, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(emailID, password).catch(err => Alert.alert("Error", err.message))
  }
  register = () => {
    const { emailID, password, name, contact, confirmPass, address } = this.state
    if (!(emailID && password && name && contact && confirmPass && address)) return Alert.alert("Error", "Please fill all fields")
    if (!(password == confirmPass)) return Alert.alert("Error", "Password doesn't match")
    firebase.auth().createUserWithEmailAndPassword(emailID, password).then(user => {
      db.collection("users").add({ emailID, name, contact, address })
    })
  }
  modal = (modalVisible, hideModal) => {
    const { name, emailID, contact, password, confirmPass, address } = this.state
    const setName = n => this.setState({ name: n })
    const setEmailID = s => this.setState({ emailID: s })
    const setPassword = s => this.setState({ password: s })
    const setContact = c => this.setState({ contact: c })
    const setConfirmPass = c => this.setState({ confirmPass: c })
    const setAddress = c => this.setState({ address: c })
    return (
      // Overlay uses Modal Component and gives background gradient
      <Overlay animationType="fade" onBackdropPress={hideModal} isVisible={modalVisible} overlayStyle={styles.modal}>
        <ScrollView>
          <Text style={styles.subtitle}>Register</Text>
          <TextInput
            style={styles.rinp}
            label="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.rinp}
            label="Email Address"
            keyboardType="email-address"
            value={emailID}
            onChangeText={setEmailID}
          />
          <TextInput
            style={styles.rinp}
            label="Contact No"
            keyboardType="numeric"
            value={contact}
            onChangeText={setContact}
          />
          <TextInput
            style={styles.rinp}
            label="Address"
            multiline
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.rinp}
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.rinp}
            label="Confirm Password"
            secureTextEntry
            value={confirmPass}
            onChangeText={setConfirmPass}
          />
          <Button mode="outlined" onPress={this.register}>
            REGISTER
          </Button>
          <Button mode="outlined" onPress={hideModal}>
            CAncel
          </Button>
        </ScrollView>
      </Overlay>
    )
  }
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
    marginBottom: 10,
    textAlign: "center"
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
    width: "90%",
    height: "70%",
    // alignItems: "center"
  },
  rinp: {
    width: "100%",
    margin: 5,
    alignSelf: "center"
  }
})

