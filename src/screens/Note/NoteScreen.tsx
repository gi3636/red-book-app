import React from 'react'
import { Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
function NoteScreen(props) {
  const route = useRoute()
  const item: any = route.params
  return <Text>{JSON.stringify(item)}</Text>
}

export default NoteScreen
