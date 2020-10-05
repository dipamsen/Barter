import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { Provider, ProgressBar } from 'react-native-paper'
import * as Font from 'expo-font'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
// import screens
import Login from './screens/Login'
import Dashboard from './screens/Dashboard'
import Exchange from './screens/Exchange'
import Settings from './screens/Settings'

import theme from './components/Theme'
import CustomDrawer from './components/Drawer'

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
        // Provider component gives same theme to all its children components (Feature of React Native Paper package)
        <Provider theme={theme}>
          <AppScreens />
        </Provider>
      );
    // // If fonts have not loaded then show Progress (loading) Bar
    else return <ProgressBar indeterminate />
  }
}

const Home = createMaterialBottomTabNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="home" color={tintColor} />,
      tabBarColor: "#5005ff"
    }
  },
  Exchange: {
    screen: Exchange,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <Icon name="exchange" color={tintColor} type="font-awesome" />,
      tabBarColor: "#349bfb"
    }
  }
}, {
  shifting: true,
  inactiveColor: "#dddddd",
  activeColor: "#fff"
})


const MainApp = createDrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      drawerLabel: "Home",
      drawerIcon: ({ focused }) => <Icon name="home" color={focused ? "#5005ff" : "#000"} />
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      drawerLabel: "Settings",
      drawerIcon: ({ focused }) => <Icon name="settings" color={focused ? "#5005ff" : "#000"} />
    }
  }
}, {
  contentComponent: CustomDrawer
})

const AppScreens = createAppContainer(
  createSwitchNavigator({
    Login, MainApp
  })
)