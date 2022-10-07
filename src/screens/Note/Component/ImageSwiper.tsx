import React from 'react'
import Swiper from 'react-native-swiper'
import { AspectRatio, Image, View } from 'native-base'
import { StyleSheet } from 'react-native'
import colors from '../../../styles/colors'

function ImageSwiper({ item }) {
  return (
    <Swiper style={styles.wrapper} showsButtons={true} index={0} loop={false}>
      {item.imageList.map((imageUrl) => {
        return (
          <View style={styles.slide} key={imageUrl}>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image
                source={{
                  uri: imageUrl
                }}
                alt="image"
              />
            </AspectRatio>
          </View>
        )
      })}
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
