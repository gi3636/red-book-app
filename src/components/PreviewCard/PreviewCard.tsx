import React, { useState } from 'react'
import { AspectRatio, Avatar, Box, HStack, Image, Skeleton, Stack, Text } from 'native-base'
import { Feather, FontAwesome } from '@expo/vector-icons'
import colors from '../../styles/colors'
import PreviewImage from './PreviewImage'
import PreviewFooter from './PreviewFooter'

function PreviewCard({ item }) {
  return (
    <Box
      overflow="hidden"
      width="95%"
      rounded="lg"
      m={1}
      _light={{
        backgroundColor: 'gray.50'
      }}>
      <PreviewImage item={item} />
      <Stack p="2" space={1}>
        <Text
          numberOfLines={2}
          ellipsizeMode={'tail'}
          maxW="96%"
          fontWeight="600"
          _light={{
            color: colors.black
          }}>
          {item.title}
        </Text>
        <PreviewFooter item={item} />
      </Stack>
    </Box>
  )
}

export default React.memo(PreviewCard)
