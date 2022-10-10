import React from 'react'
import { ImageBackground } from 'react-native'
import colors from '../styles/colors'

function Background({ children }) {
  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: colors.primary }}
      source={require('../assets/images/bumble-bg.png')}
      resizeMode="contain">
      {children}
    </ImageBackground>
  )
}

export default Background
