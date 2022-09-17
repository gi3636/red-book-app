import React from 'react'
import Swiper from 'react-native-swiper'
import { AspectRatio, Image, View } from 'native-base'
import { StyleSheet } from 'react-native'
import colors from '../../styles/colors'

function ImageSwiper({ item }) {
  return (
    <Swiper style={styles.wrapper} showsButtons={true} index={0} loop={false}>
      <View style={styles.slide}>
        <AspectRatio w="100%" ratio={16 / 9}>
          <Image
            source={{
              uri: `https://avatars1.githubusercontent.com/u/${1}`
            }}
            alt="image"
          />
        </AspectRatio>
      </View>
      <View style={styles.slide}>
        <AspectRatio w="100%" ratio={3 / 4}>
          <Image
            source={{
              uri: `https://avatars1.githubusercontent.com/u/${2}`
            }}
            alt="image"
          />
        </AspectRatio>
      </View>
      <View style={styles.slide}>
        <AspectRatio w="100%" ratio={item.like ? 3 / 4 : 16 / 9}>
          <Image
            source={{
              uri: `https://avatars1.githubusercontent.com/u/${3}`
            }}
            alt="image"
          />
        </AspectRatio>
      </View>
    </Swiper>
  )
}
const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    height: '100%'
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default ImageSwiper
