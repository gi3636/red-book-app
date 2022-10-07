import React, { useState } from 'react'
import { Heading, Spinner, View } from 'native-base'
import { StyleSheet, ViewStyle } from 'react-native'
import colors from '../styles/colors'

type CustomStyleProp = {
  loading: boolean
  style?: ViewStyle
  title?: string
  color?: string
}

function CustomLoading({ loading, style, title, color }: CustomStyleProp) {
  return (
    <View style={[styles.container, { display: loading ? 'flex' : 'none', ...style }]}>
      <View style={styles.spinnerContainer}>
        <Spinner size="lg" style={styles.spinner} color={color || colors.primary} />
        <Heading color={colors.black} fontSize="md">
          {title || '加载中'}
        </Heading>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  spinnerContainer: {
    padding: 30,
    paddingHorizontal: 50,
    backgroundColor: colors.white,
    borderRadius: 20
  },
  spinner: {
    paddingBottom: 10
  }
})

export default CustomLoading
