import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import ChatItem from './ChatItem'
const screenHeight = Dimensions.get('window').height

export default function ChatBody() {
  return (
    <ScrollView style={{ height: screenHeight - 100 }}>
      <View style={styles.container}>
        <View>
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </View>
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
