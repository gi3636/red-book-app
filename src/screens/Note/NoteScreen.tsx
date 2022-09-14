import React from 'react'
import { Dimensions, ImageBackground, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { AppRegistry, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { AspectRatio, Image, ScrollView, View } from 'native-base'
import ImageSwiper from './ImageSwiper'
import colors from '../../styles/colors'
import { LinearGradient } from 'expo-linear-gradient'
const screenHeight = Dimensions.get('window').height
function NoteScreen(props) {
  const route = useRoute()
  const item: any = route.params
  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={{ flex: 1 }}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/bumble-bg.png')} resizeMode="contain">
        <View>
          <View style={styles.container}>
            <ImageSwiper item={item} />
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </ImageBackground>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    height: '40%'
  },
  title: {
    fontSize: 20
  }
})
export default NoteScreen
