/*
 * @Author: franky franky.b@iscmango.com
 * @Date: 2022-09-06 19:13:11
 * @LastEditors: franky franky.b@iscmango.com
 * @LastEditTime: 2022-11-17 15:56:48
 * @FilePath: /red-book-app/src/screens/Profile/component/ProfileBody.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { View } from 'native-base'
import colors from '../../../styles/colors'
import HorizontalLine from '../../../components/HorizontalLine'
import CollectionTab from './CollectionTab'
import EditBtn from './EditBtn'
import { Dimensions, StyleSheet } from 'react-native'
import ProfileDetail from './ProfileDetail'
/* 屏幕的宽度 */
const screenWidth = Dimensions.get('window').width

function ProfileBody({ navigation }) {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.content}>
        {/*详情*/}
        <ProfileDetail />
        {/*水平线 */}
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
