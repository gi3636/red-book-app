import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import Icon from '../../../assets/images/bell.svg'
import colors from '@/styles/colors'

interface BellIconProps {
  onPress?: Function
  hasDot: boolean
  style?: StyleProp<ViewStyle>
}

function BellIcon({ hasDot, onPress, style }: BellIconProps) {
  return (
    <View style={[{ marginHorizontal: 5 }, style]}>
      <Icon
        style={styles.icon}
        onPress={() => {
          onPress && onPress()
        }}
      />
      {hasDot && <View style={styles.dot} />}
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {},
  dot: {
    backgroundColor: colors.danger,
    padding: 4,
    position: 'absolute',
    right: -6,
    borderRadius: 50
  }
})

export default BellIcon
