import React from 'react'
import { Avatar } from '@rneui/base'
import { StyleSheet, Text, View } from 'react-native'
import colors from '@/styles/colors'

function MessageItem(props) {
  return (
    <>
      <View style={styles.messageContainer}>
        <Avatar
          size={50}
          rounded
          source={{
            uri: 'https://randomuser.me/api/portraits/women/57.jpg'
          }}
          containerStyle={{
            backgroundColor: 'grey'
          }}
        />
        <View style={styles.messageContent}>
          <Text style={styles.font}>这是一个信息</Text>
        </View>
      </View>
      <View style={[styles.messageContainer, styles.self]}>
        <Avatar
          avatarStyle={{ padding: 10 }}
          size={50}
          rounded
          source={{
            uri: 'https://randomuser.me/api/portraits/women/57.jpg'
          }}
          containerStyle={{
            backgroundColor: 'grey'
          }}
        />
        <View style={[styles.messageContent, styles.selfMessageContent]}>
          <Text style={[styles.font, styles.selfFont]}>
            Free online icon converter: change your files to the format you need in the blink of an eye
          </Text>
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  messageContainer: {
    padding: 10,
    flexDirection: 'row'
  },
  self: {
    flexDirection: 'row-reverse'
  },
  selfMessageContent: {
    color: colors.white,
    backgroundColor: colors.primary
  },
  messageContent: {
    flexDirection: 'column',
    marginHorizontal: 12,
    color: colors.white,
    backgroundColor: colors.white_smoke,
    borderRadius: 10,
    padding: 12,
    maxWidth: '70%'
  },
  font: {
    lineHeight: 24,
    color: colors.black
  },
  selfFont: {
    color: colors.white
  }
})
export default MessageItem
