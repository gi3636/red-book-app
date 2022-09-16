import React from 'react'
import { Text } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { Avatar } from '@rneui/base'
function CustomNoteHeader(props) {
  const route = useRoute()
  const item: any = route.params
  return (
    <>
      <Avatar
        containerStyle={{ marginLeft: -10 }}
        size={40}
        rounded
        source={{
          uri: `https://avatars1.githubusercontent.com/u/${parseInt(String(item.avatar * Math.random()))}`
        }}
      />
      <Text fontSize="md" color="white" paddingLeft={2}>
        {item.title}
      </Text>
    </>
  )
}

export default CustomNoteHeader
