import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddFriendIcon from './AddFriendIcon'
import BellIcon from './BellIcon'
export default function ChatHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>消息(12)</Text>
      </View>
      <View style={styles.rightBtnContainer}>
        <BellIcon hasDot={true} style={{ marginRight: 15 }} />
        <AddFriendIcon hasDot={true} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleContainer: {
    flex: 1
  },
  title: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    justifySelf: 'center',
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  rightBtnContainer: {
    position: 'absolute',
    right: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
