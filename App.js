import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider, ProgressBar } from 'react-native-paper'
import * as Font from 'expo-font'
// import screens
import Login from './screens/Login'
import theme from './components/Theme'

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loaded: false
    }
  }
  componentDidMount() {
    // Loading Custom Fonts
    Font.loadAsync({
      Regular: require("./assets/fonts/MerriweatherSans-Regular.ttf"),
      Light: require("./assets/fonts/MerriweatherSans-Light.ttf"),
      Bold: require("./assets/fonts/MerriweatherSans-Bold.ttf"),
      Medium: require("./assets/fonts/MerriweatherSans-Medium.ttf"),
    }).then(val => {
      this.setState({ loaded: true })
    })
  }
  render() {
    if (this.state.loaded)
      return (
        // Provider component gives same theme to all its children components
        <Provider theme={theme}>
          <View style={{ flex: 1 }}>
            <Login />
          </View>
        </Provider>
      );
    else return <ProgressBar indeterminate />
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
