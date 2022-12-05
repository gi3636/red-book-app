import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackgroundColor from '@/components/BackgroundColor'
import Background from '@/components/Background'
import colors from '@/styles/colors'
import { Avatar, Input } from '@rneui/base'
import CustomInput from '@/components/CustomInput'

export default function MessageScreen() {
  return (
    // <BackgroundColor>
    <View style={styles.container}>
      <View>
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
            <Text style={[styles.font, styles.selfFont]}>这是一个信息</Text>
          </View>
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Input />
      </View>
    </View>

    // </BackgroundColor>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
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
    padding: 12
  },
  font: {
    color: colors.black
  },
  selfFont: {
    color: colors.white
  },
  inputContainer: {
    width: '100%',
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 0,
    left: 0
  }
})
