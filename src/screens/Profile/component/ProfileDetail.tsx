/*
 * @Author: franky franky.b@iscmango.com
 * @Date: 2022-09-14 13:12:33
 * @LastEditors: franky franky.b@iscmango.com
 * @LastEditTime: 2022-11-17 12:12:24
 * @FilePath: /red-book-app/src/screens/Profile/component/ProfileDetail.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'
import { Avatar, Text } from '@rneui/base'
import { View } from 'native-base'
import colors from '../../../styles/colors'
import FemaleIcon from '../../../assets/images/female.svg'
import MaleIcon from '../../../assets/images/male.svg'
import CopyIcon from '../../../assets/images/copy.svg'
import Detail from './Detail'
import { useSelector } from 'react-redux'
import { Alert } from 'react-native'

function ProfileDetail(props) {
  const myself = useSelector((state: any) => {
    return state.user
  })
  console.log('user', myself)

  return (
    <>
      {/* 头像 */}
      <Avatar
        size={140}
        rounded
        source={{
          uri: 'https://randomuser.me/api/portraits/women/57.jpg'
        }}
        containerStyle={{
          backgroundColor: 'grey'
        }}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text
          style={{
            fontSize: 24,
            color: colors.main_font,
            paddingTop: 5
          }}>
          {myself.sex === '女' && <FemaleIcon />}
          &#8197; {myself.nickname} &#8197;
          {myself.sex === '男' && <MaleIcon />}
        </Text>
      </View>
      {/* ID */}
      <Text style={{ fontSize: 12, color: colors.main_font, padding: 5 }}>
        ID:{myself.id}
        <CopyIcon
          onPress={() => {
            console.log('拷贝')
          }}
        />
      </Text>
      {/* 介绍 */}
      <Detail myself={myself} />
    </>
  )
}

export default ProfileDetail
