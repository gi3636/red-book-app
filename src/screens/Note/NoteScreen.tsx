import React, { useState } from 'react'
import { Dimensions, ImageBackground, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { AppRegistry, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import { AspectRatio, Image, View, ScrollView, HStack, Input } from 'native-base'
import ImageSwiper from './ImageSwiper'
import colors from '../../styles/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Icon, Avatar } from '@rneui/base'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import CustomInput from '../../components/CustomInput'
import CommentItem from '../../components/Comment/CommentItem'
const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width
function NoteScreen(props) {
  const route = useRoute()
  const item: any = route.params
  const [commentInput, setCommentInput] = useState('')
  return (
    //<LinearGradient colors={[colors.primary, colors.secondary]} style={{ flex: 1 }}>
    <ImageBackground
      style={{ flex: 1, backgroundColor: colors.primary }}
      source={require('../../assets/images/bumble-bg.png')}
      resizeMode="contain">
      <View style={styles.bottomBarContainer}>
        <HStack style={styles.bottomBar}>
          <Input
            _light={{
              color: 'black',
              backgroundColor: 'white',
              borderRadius: 30,
              fontSize: 14,
              padding: 2,
              paddingLeft: 4
            }}
            style={{
              borderRadius: 10
            }}
            placeholder="写下你的评论..."
            width="45%"
            h={9}
          />
          <HStack alignItems="center" justifyContent="space-between">
            <AntDesign name="hearto" size={22} color="black" />
            <Text style={{ color: colors.black, marginLeft: 3, fontSize: 14 }}>20</Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <AntDesign name="staro" size={22} color="black" />
            <Text style={{ color: colors.black, marginLeft: 3, fontSize: 14 }}>20</Text>
          </HStack>
          <HStack alignItems="center" justifyContent="space-between">
            <Ionicons name="chatbox-ellipses-outline" size={22} color="black" />
            <Text style={{ color: colors.black, marginLeft: 3, fontSize: 14 }}>20</Text>
          </HStack>
        </HStack>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <ImageSwiper item={item} />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>
            {
              '2008年，文章在热播剧《奋斗》中出演男二号向南份发未发文发而无法方法恶违法恶违法发文废物费发未发文发而无法发文发未发文发而无法恶违法吗1可进口量2件看六角恐龙接口逻辑哇靠练腹肌安慰法那里能，引起广泛关注。这也是文章和妻子马伊琍的第二次合作。2009年，文章进入电影届，主演第一部电影《走着瞧》。该片在上海国际电影节新片展映单元和东京国际电影节“亚洲风”单元获。'
            }
          </Text>
          <HStack justifyContent="space-between" alignItems="center">
            <Text style={styles.date}>31-05-2019 14:22</Text>
            <Button
              containerStyle={{
                borderRadius: 20,
                borderColor: colors.white,
                borderWidth: 1
              }}
              titleStyle={{ fontSize: 11 }}
              buttonStyle={{
                padding: 3,
                backgroundColor: colors.primary
              }}>
              不喜欢
              <Entypo name="emoji-sad" size={14} color="white" style={{ paddingLeft: 4 }} />
            </Button>
          </HStack>
        </View>
        <View style={styles.commentContainer}>
          <Text style={{ color: colors.white }}>共 3 条评论</Text>
          <View style={styles.commentList} w="100%">
            <CommentItem item={item} />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
    //</LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
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
    color: colors.white_smoke
  },
  commentContainer: {
    padding: 10,
    width: '100%',
    height: 400
  },
  commentList: {
    paddingTop: 10
  },
  commentItem: {
    paddingVertical: 10
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    borderRadius: 30,
    width: '97%',
    height: 50,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    zIndex: 2,
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})
export default NoteScreen
