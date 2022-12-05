import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import ChatItem from './ChatItem'
import TouchableScale from 'react-native-touchable-scale'
const screenHeight = Dimensions.get('window').height

export default function ChatBody({ navigation }) {
  function renderChatItem() {
    return (
      <TouchableScale
        friction={100}
        tension={100}
        activeScale={0.98}
        onPress={() => {
          console.log('hello world')
          // @ts-ignore
          navigation.navigate('Message', { nickname: '测试123' })
        }}>
        <ChatItem />
      </TouchableScale>
    )
  }
  return (
    <ScrollView style={{ height: screenHeight - 100 }}>
      <View style={styles.container}>
        <View>{renderChatItem()}</View>
        <Text style={styles.noMore}>暂时没有更多了...</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: 'white',
    minHeight: screenHeight - 0
  },
  noMore: {
    paddingVertical: 23,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center'
  }
})
