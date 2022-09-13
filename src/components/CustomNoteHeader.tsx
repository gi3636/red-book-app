import React from 'react'
import { Avatar, Text } from 'native-base'
import { useRoute } from '@react-navigation/native'
function CustomNoteHeader(props) {
  const route = useRoute()
  const item: any = route.params
  return (
    <>
      <Avatar
        size="md"
        source={{
          uri: `https://avatars1.githubusercontent.com/u/${item.avatar}`
        }}>
        TE
      </Avatar>
      <Text fontSize="lg" color="white" paddingLeft={2}>
        {item.title}
      </Text>
    </>
  )
}

export default CustomNoteHeader
