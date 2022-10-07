import React, { useState } from 'react'
import { View, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import colors from '../styles/colors'
import { Switch } from '@rneui/base'

type Props = {
  title: string
  checked: boolean
  setChecked: (value: boolean) => void
}
function CustomSwitch({ title, checked, setChecked }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Switch
        style={styles.switch}
        color={colors.primary}
        thumbColor={colors.white_smoke}
        thumbTintColor={colors.primary}
        value={checked}
        onValueChange={setChecked}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 40,
    backgroundColor: colors.white,
    paddingHorizontal: 15
  },
  title: {
    fontSize: 16,
    color: colors.medium
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }]
  }
})

export default CustomSwitch
