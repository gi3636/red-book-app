import { Dimensions } from 'react-native'
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

export default {
  window: {
    width,
    height: height + 50
  },
  isSmallDevice: width < 375
}
