import React, { useRef } from 'react'
import { StyleSheet } from 'react-native'

import BackgroundColor from '@/components/BackgroundColor'
import ChatBody from './component/ChatBody'
import ChatHeader from './component/ChatHeader'
import { ScrollView } from 'native-base'

export default function ChatScreen({ navigation }) {
  const videoRef = useRef(null)
  return (
    <BackgroundColor>
      <ChatHeader />
      <ChatBody navigation={navigation} />
    </BackgroundColor>
  )
}
const styles = StyleSheet.create({})
