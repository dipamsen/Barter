import { DefaultTheme } from 'react-native-paper'

export default {
    ...DefaultTheme,
    // dark: true,
    fonts: {
        ...DefaultTheme.fonts,
        regular: {
            fontFamily: "Regular"
        },
        medium: {
            fontFamily: "Medium"
        },
        light: {
            fontFamily: "Light"
        },
    },
    colors: {
        ...DefaultTheme.colors,
        primary: "#5005ff",
        accent: "#ffa805"
    }
}