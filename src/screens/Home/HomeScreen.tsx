import React from 'react'
import { Dimensions, ImageBackground, SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import colors from '../../styles/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { AspectRatio, Avatar, Box, Center, Heading, HStack, Image, ScrollView, Stack, Text, View } from 'native-base'
import { Feather, FontAwesome } from '@expo/vector-icons'
import MasonryList from '@react-native-seoul/masonry-list'
import PreviewCard from '../../components/PreviewCard'
import HomeTopTabNavigator from '../../navigation/HomeTopTabNavigator'

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeTopTabNavigator />
      <StatusBar animated={true} backgroundColor={colors.primary} />
      {/*<HomeTopTabNavigator />*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    flex: 1,
    width: '100%'
  }
})

export default HomeScreen
