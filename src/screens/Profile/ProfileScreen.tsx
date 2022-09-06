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
/* 屏幕的宽度 */
const screenWidth = Dimensions.get('window').width
/* 屏幕的高度 */
const screenHeight = Dimensions.get('window').height
export default function ProfileScreen() {
  return (
    <SafeAreaView>
      <ProfileHeader />
      <View style={styles.container}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          colors={[colors.primary, colors.secondary]}
          style={styles.linearGradient}>
          <ProfileBody />
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
  },
  profileContainer: {
    height: screenHeight,
    width: screenWidth - 50,
    marginLeft: 25,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  editBtnContainer: {
    position: 'absolute',
    top: 10,
    right: 15
  },
  editBtn: {
    width: '20%',
    borderRadius: 20
  },
  content: {
    position: 'relative',
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    top: -50
  }
})
