import React, { Component } from 'react'
import { Text, ToastAndroid, View, StyleSheet, FlatList } from 'react-native'
import MyHeader from '../components/Header'
import firebase from 'firebase'
import db from '../config'
import { List } from 'react-native-paper'

export default class Dashboard extends Component {
  constructor() {
    super();
    /**
     * @type {{ data: { date: Date, description: string, name: string, user: {
       address: string, contact: number, emailID: string, name: string
      } }[] }}
     */
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
    this.dblistener?.();
  }
  getData = () => {
    this.dblistener = db.collection("allItems").onSnapshot(snapshot => {
      let allItems = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      this.setState({ data: allItems })
    })
  }
  render() {
    return (
      <>
        <MyHeader navigation={this.props.navigation} />
        <View style={styles.container}>
          <FlatList
            renderItem={this.renderItem}
            data={this.state.data}
            keyExtractor={item => item.id}
          />
        </View>
      </>
    )
  }
  renderItem = ({ item, index }) => (
    <List.Item
      title={item.name}
      description={item.description}
      onPress={() => null}
      rippleColor="lightblue"
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
})