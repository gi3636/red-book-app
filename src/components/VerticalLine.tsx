import React from 'react'
import { View } from 'native-base'
import colors from '../styles/colors'
import { StyleSheet } from 'react-native'

function HorizontalLine({ style }: { style?: any }) {
  return <View style={{ ...styles.line, ...style }} />
}

const styles = StyleSheet.create({
  line: {
    marginTop: 5,
    backgroundColor: colors.placeholder,
    width: 1,
    height: '80%',
    borderRadius: 20
  }
})

export default HorizontalLine
