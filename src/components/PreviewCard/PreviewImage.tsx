import React from 'react'
import { AspectRatio, Box, Image } from 'native-base'

function PreviewImage({ item }) {
  return (
    <Box>
      <AspectRatio w="100%" ratio={item.like ? 3 / 4 : 16 / 9}>
        <Image
          source={{
            uri: `https://avatars1.githubusercontent.com/u/${item.avatar + 1}`
          }}
          alt="image"
        />
      </AspectRatio>
    </Box>
  )
}

export default React.memo(PreviewImage)
