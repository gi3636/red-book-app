import React, { useState } from 'react'
import { AspectRatio, Avatar, Box, HStack, Image, Skeleton, Stack, Text } from 'native-base'
import colors from '../styles/colors'
import { Feather, FontAwesome } from '@expo/vector-icons'

function PreviewCard({ item }) {
  const [isLoaded, setIsLoaded] = useState(true)
  //setTimeout(() => {
  //  setIsLoaded(true)
  //}, 500)
  return (
    <Box
      overflow="hidden"
      width="95%"
      rounded="lg"
      m={1}
      _light={{
        backgroundColor: 'gray.50'
      }}>
      <Skeleton h="40" isLoaded={isLoaded} startColor="gray.300">
        <Box>
          <AspectRatio w="100%" ratio={item.like ? 3 / 4 : 16 / 9}>
            <Image
              source={{
                uri: `https://avatars1.githubusercontent.com/u/${item.avatar}`
              }}
              alt="image"
            />
          </AspectRatio>
        </Box>
      </Skeleton>
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
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Avatar
              bg="coolGray.200"
              size="xs"
              source={{
                //uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                uri: `https://avatars1.githubusercontent.com/u/${item.avatar + 1}`
              }}>
              AJ
            </Avatar>
            <Text color={colors.main_font} fontWeight="400" fontSize="12" pl="1">
              {item.username}
            </Text>
          </HStack>
          {item.like ? (
            <FontAwesome name="heart" size={16} color={colors.danger} />
          ) : (
            <Feather name="heart" size={16} color={colors.placeholder} />
          )}
        </HStack>
      </Stack>
    </Box>
  )
}

export default PreviewCard
