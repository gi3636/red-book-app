import React from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { HStack, ScrollView, View } from 'native-base'
import ImageSwiper from './Component/ImageSwiper'
import colors from '../../styles/colors'
import { Button } from '@rneui/base'
import { Entypo } from '@expo/vector-icons'
import { convertTime } from '../../utils'
import BottomInputBar from './Component/BottomInputBar'
import CommentList from './Component/CommentList'
import DislikeBtn from './Component/DislikeBtn'

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
function NoteScreen(props) {
  const route = useRoute()
  const item: any = route.params

  return (
    //<LinearGradient colors={[colors.primary, colors.secondary]} style={{ flex: 1 }}>
    <ImageBackground
      style={{ flex: 1, backgroundColor: colors.primary }}
      source={require('../../assets/images/bumble-bg.png')}
      resizeMode="contain">
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageSwiper item={item} />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text style={styles.date}>{convertTime(item.createdTime, 'YYYY-MM-DD  HH:mm')}</Text>
            <DislikeBtn />
          </HStack>
        </View>
        <CommentList item={item} />
      </ScrollView>
      <BottomInputBar item={item} />
    </ImageBackground>
    //</LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    // paddingBottom: 100,
    marginBottom: 65
  },
  imageContainer: {
    height: screenHeight * 0.5,
    backgroundColor: colors.black
  },
  detailContainer: {
    padding: 10
  },
  title: {
    color: colors.white,
    fontSize: 20
  },
  content: {
    marginVertical: 10,
    color: colors.white,
    fontSize: 14
  },
  date: {
    fontSize: 12,
    color: colors.white_smoke_200
  }
})
export default NoteScreen
