import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import colors from '../../styles/colors'
import HomeTopTabNavigator from '../../navigation/HomeTopTabNavigator'

const HomeScreen = () => {
  return (
    <>
      <HomeTopTabNavigator />
      <StatusBar backgroundColor={colors.primary} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default HomeScreen
