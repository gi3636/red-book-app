import React, { useEffect } from 'react'
import { Avatar, HStack, Text } from 'native-base'
import colors from '../../styles/colors'
import LikeBtn from '../IconButton/LikeBtn'
import { appEmitter } from '../../utils/app.emitter'
function PreviewFooter({ item }) {
  const [key, setKey] = React.useState(item.id)

  useEffect(() => {
    appEmitter.on(appEmitter.type.refreshPreviewCard, (id) => {
      if (item.id === id) {
        setKey(Math.random())
      }
    })
  }, [])

  return (
    <HStack key={key} alignItems="center" space={4} justifyContent="space-around">
      <HStack alignItems="center">
        <Avatar
          bg="coolGray.200"
          size="xs"
          source={{
            uri: item.avatar
          }}>
          AJ
        </Avatar>
        <Text
          color={colors.main_font}
          w="90"
          numberOfLines={1}
          fontWeight="400"
          fontSize="12"
          pl="1"
          ellipsizeMode="tail">
          {item.nickname}
        </Text>
      </HStack>
      <LikeBtn size={18} item={item} />
    </HStack>
  )
}

export default React.memo(PreviewFooter)
