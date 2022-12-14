import React from 'react'
import { View } from 'native-base'
import colors from '../styles/colors'
import { StyleSheet } from 'react-native'

function HorizontalLine({ style }: { style?: any }) {
  return <View style={{ ...styles.line, ...style }} />
}

const styles = StyleSheet.create({
  line: {
    opacity: 0.5,
    marginTop: 10,
    backgroundColor: colors.placeholder,
    height: 1,
    width: '100%'
  }
})

export default HorizontalLine
