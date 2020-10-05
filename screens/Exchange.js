import React, { Component } from 'react'
import { ToastAndroid, View, StyleSheet, Alert } from 'react-native'
import MyHeader from '../components/Header'
import firebase from 'firebase'
import db from '../config'
import { TextInput, Text, Button } from 'react-native-paper'

export default class Exchange extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: '',
      userID: firebase.auth().currentUser.email
    }
  }
  addItem = () => {
    const { name, description } = this.state;
    if (name && description) {
      try {
        db.collection("users").where("emailID", "==", this.state.userID).get().then(snapshot => {
          snapshot.forEach(doc => {
            const user = doc.data()
            db.collection("allItems").add({
              name, description, user, date: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
              Alert.alert("Item Added successfully.");
              this.props.navigation.navigate("Dashboard")
              this.setState({
                name: '',
                description: ''
              })
            })
          })
        })
      }
      catch (err) {
        Alert.alert(err.message)
      }
    }
  }
  render() {
    const { name, description } = this.state;
    const setName = n => this.setState({ name: n });
    const setDescription = n => this.setState({ description: n });
    return (
      <>
        <MyHeader navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.title}>Add Item for Barter</Text>
          <TextInput
            label="Item Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            label="Description"
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
          />
          <Button onPress={this.addItem}>
            Add Item
          </Button>
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 20
  }
})