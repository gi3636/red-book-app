import React from 'react'
import { AspectRatio, Box, Image } from 'native-base'
import CachedImage from 'expo-cached-image'
import { ActivityIndicator } from 'react-native'
import colors from '../../styles/colors'

function PreviewImage({ item }) {
  return (
    <Box>
      <AspectRatio w="100%" ratio={item.like ? 3 / 4 : 16 / 9}>
        <Image
          source={{
            uri: item.images[0]
          }}
          alt="image"
        />
      </AspectRatio>
    </Box>
  )
}

export default React.memo(PreviewImage)
