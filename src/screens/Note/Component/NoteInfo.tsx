import React from 'react'
import { HStack, View } from 'native-base'
import { StyleSheet, Text } from 'react-native'
import { convertTime } from '../../../utils'
import DislikeBtn from './DislikeBtn'
import colors from '../../../styles/colors'

function NoteInfo({ item }) {
  return (
    <View style={styles.detailContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
      <HStack justifyContent="space-between" alignItems="center">
        <Text style={styles.date}>{convertTime(item.createdTime, 'YYYY-MM-DD  HH:mm')}</Text>
        <DislikeBtn />
      </HStack>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default NoteInfo
