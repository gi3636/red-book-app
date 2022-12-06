import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '@/styles/colors'
import BottomInput from '@/screens/Message/component/BottomInput'
import MessageList from '@/screens/Message/component/MessageList'
import { Feather } from '@expo/vector-icons'

export default function MessageScreen() {
  return (
    <View style={styles.container}>
      <MessageList />
      <BottomInput item={undefined} total={undefined} />
      <View style={styles.toolBoxContainer}>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Feather name="image" size={30} color={colors.primary} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  toolBoxContainer: {
    paddingHorizontal: 20,
    height: 80,
    backgroundColor: colors.primary
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  }
})
