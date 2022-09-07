import { LinearGradient } from 'expo-linear-gradient'
import * as React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import MaleIcon from '../../assets/images/male.svg'
import FemaleIcon from '../../assets/images/female.svg'
import CopyIcon from '../../assets/images/copy.svg'
import { Avatar, Button, Text } from '@rneui/base'
import colors from '../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Flex, View } from 'native-base'
import CollectionTab from './component/CollectionTab'
import ProfileHeader from './component/ProfileHeader'
import EditBtn from './component/EditBtn'
import HorizontalLine from '../../components/HorizontalLine'
import Detail from './component/Detail'
import ProfileBody from './component/ProfileBody'
import { useEffect } from 'react'
import { appEmitter } from '../../utils/app.emitter'
/* 屏幕的宽度 */
const screenWidth = Dimensions.get('window').width
/* 屏幕的高度 */
const screenHeight = Dimensions.get('window').height
export default function ProfileScreen({ navigation }) {
  //useEffect(() => {
  //  appEmitter.on(appEmitter.type.openDrawer, navigation.openDrawer)
  //}, [])
  return (
    <SafeAreaView>
      <ProfileHeader />
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[colors.primary, colors.secondary]}
          style={styles.linearGradient}>
          <ProfileBody navigation={navigation} />
        </LinearGradient>
      </View>
    </SafeAreaView>
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
