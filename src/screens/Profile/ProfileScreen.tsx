import { LinearGradient } from 'expo-linear-gradient'
import * as React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import colors from '../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'native-base'
import ProfileHeader from './component/ProfileHeader'
import ProfileBody from './component/ProfileBody'
/* 屏幕的宽度 */
const screenWidth = Dimensions.get('window').width
/* 屏幕的高度 */
const screenHeight = Dimensions.get('window').height
export default function ProfileScreen({ navigation }) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[colors.primary, colors.secondary]}
      style={styles.linearGradient}>
      <SafeAreaView>
        <ProfileHeader />
        <View style={styles.container}>
          <ProfileBody navigation={navigation} />
        </View>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: colors.primary
  },
  linearGradient: {
    flex: 1
  }
})
