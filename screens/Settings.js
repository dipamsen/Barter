import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, TextInput, Button } from 'react-native-paper'
import MyHeader from '../components/Header'
import db from "../config"
import firebase from "firebase"
import { Alert } from 'react-native'

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      contact: '',
      currentUser: firebase.auth().currentUser.email,
      userId: null
    }
  }
  componentDidMount() {
    this.getData()
  }
  getData() {
    db.collection("users").where("emailID", "==", this.state.currentUser).get().then(data => {
      data.docs.forEach(x => {
        const userinfo = x.data()
        this.setState({
          name: userinfo.name,
          address: userinfo.address,
          contact: userinfo.contact,
          userId: x.id
        })
      })
    })
  }
  saveDetails() {
    const { name, address, contact } = this.state
    db.collection("users").doc(this.state.userId).update({
      name, address, contact
    }).then(() => Alert.alert("Updated Data", "Updated Data Successfully."))
  }
  render() {
    return (
      <>
        <MyHeader navigation={this.props.navigation} />
        <View>
          <Text style={styles.header}> Settings </Text>
          <TextInput label="Name" value={this.state.name} onChangeText={text => this.setState({ name: text })} />
          <TextInput label="Address" value={this.state.address} onChangeText={text => this.setState({ address: text })} />
          <TextInput label="Contact" value={this.state.contact} onChangeText={text => this.setState({ contact: text })} />
          <Button onPress={this.saveDetails}>Save Details</Button>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    textAlign: "center"
  }
})
