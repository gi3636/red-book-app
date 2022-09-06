import React from 'react'
import { View } from 'native-base'
import colors from '../styles/colors'

function HorizontalLine(props) {
  return (
    <View
      style={{
        opacity: 0.5,
        marginTop: 10,
        backgroundColor: colors.placeholder,
        height: 1,
        width: '100%'
      }}
    />
  )
}

export default HorizontalLine
