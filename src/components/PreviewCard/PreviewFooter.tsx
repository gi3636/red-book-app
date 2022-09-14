import React from 'react'
import { Avatar, HStack, Text } from 'native-base'
import colors from '../../styles/colors'
import { Feather, FontAwesome } from '@expo/vector-icons'
function PreviewFooter({ item }) {
  return (
    <HStack alignItems="center" space={4} justifyContent="space-around">
      <HStack alignItems="center">
        <Avatar
          bg="coolGray.200"
          size="xs"
          source={{
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
