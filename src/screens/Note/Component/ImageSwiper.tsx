import React from 'react'
import Swiper from 'react-native-swiper'
import { AspectRatio, Image, View } from 'native-base'
import { Dimensions, StyleSheet } from 'react-native'
import colors from '../../../styles/colors'

const screenHeight = Dimensions.get('window').height
function ImageSwiper({ item }) {
  return (
    <View style={styles.imageContainer}>
      <Swiper style={styles.wrapper} showsButtons={true} index={0} loop={false}>
        {item.imageList.map((imageUrl) => {
          return (
            <View style={styles.slide} key={imageUrl}>
              <AspectRatio w="100%" ratio={4 / 3}>
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
    </View>
  )
}
const styles = StyleSheet.create({
  imageContainer: {
    height: screenHeight * 0.5,
    backgroundColor: colors.black
  },
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
