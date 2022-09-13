import React from 'react'
import { Avatar, HStack, Text } from 'native-base'
import colors from '../../styles/colors'
import { Feather, FontAwesome } from '@expo/vector-icons'

function PreviewFooter({ item }) {
  console.log('item.id', item.id)
  return (
    <HStack alignItems="center" space={4} justifyContent="space-around">
      <HStack alignItems="center">
        <Avatar
          bg="coolGray.200"
          size="xs"
          source={{
            //uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            uri: `https://avatars1.githubusercontent.com/u/${item.avatar}`
          }}>
          AJ
        </Avatar>
        <Text color={colors.main_font} w="100" fontWeight="400" fontSize="12" pl="1" ellipsizeMode="tail">
          {item.username}
        </Text>
      </HStack>
      {item.like ? (
        <FontAwesome name="heart" size={16} color={colors.danger} />
      ) : (
        <Feather name="heart" size={16} color={colors.placeholder} />
      )}
    </HStack>
  )
}

export default React.memo(PreviewFooter)
