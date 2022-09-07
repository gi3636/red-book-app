import React from 'react'
import { View } from 'native-base'
import { Avatar, Text } from '@rneui/base'
import colors from '../../../styles/colors'
import FemaleIcon from '../../../assets/images/female.svg'
import MaleIcon from '../../../assets/images/male.svg'
import CopyIcon from '../../../assets/images/copy.svg'
import Detail from './Detail'
import HorizontalLine from '../../../components/HorizontalLine'
import CollectionTab from './CollectionTab'
import EditBtn from './EditBtn'
import { Dimensions, StyleSheet } from 'react-native'
import ProfileDetail from './ProfileDetail'
/* 屏幕的宽度 */
const screenWidth = Dimensions.get('window').width
/* 屏幕的高度 */
const screenHeight = Dimensions.get('window').height
function ProfileBody({ navigation }) {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.content}>
        {/*详情*/}
        <ProfileDetail />
        {/* 水平线 */}
        <HorizontalLine />
        {/* 选单 */}
        <CollectionTab />
      </View>
      <EditBtn navigation={navigation} />
    </View>
  )
}
const styles = StyleSheet.create({
  profileContainer: {
    height: screenHeight,
    width: screenWidth - 50,
    marginLeft: 25,
    marginTop: 60,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  content: {
    position: 'relative',
    width: '90%',
    borderRadius: 20,
    alignItems: 'center',
    top: -80
  }
})

export default ProfileBody
