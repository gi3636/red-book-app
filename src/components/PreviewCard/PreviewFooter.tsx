import React from 'react'
import { Avatar, HStack, Text } from 'native-base'
import colors from '../../styles/colors'
import { Feather, FontAwesome } from '@expo/vector-icons'
import LikeBtn from '../IconButton/LikeBtn'
import { noteService } from '../../api'
function PreviewFooter({ item }) {
  const [isLike, setIsLike] = React.useState(item.isLike)
  let lock = false

  return (
    <HStack alignItems="center" space={4} justifyContent="space-around">
      <HStack alignItems="center">
        <Avatar
          bg="coolGray.200"
          size="xs"
          source={{
            uri: item.avatar
          }}>
          AJ
        </Avatar>
        <Text color={colors.main_font} w="100" fontWeight="400" fontSize="12" pl="1" ellipsizeMode="tail">
          {item.nickname}
        </Text>
      </HStack>
      <LikeBtn size={18} item={item} />
    </HStack>
  )
}

export default React.memo(PreviewFooter)
