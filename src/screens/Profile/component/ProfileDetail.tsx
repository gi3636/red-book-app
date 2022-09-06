import React from 'react'
import { Avatar, Text } from '@rneui/base'
import { View } from 'native-base'
import colors from '../../../styles/colors'
import FemaleIcon from '../../../assets/images/female.svg'
import MaleIcon from '../../../assets/images/male.svg'
import CopyIcon from '../../../assets/images/copy.svg'
import Detail from './Detail'

function ProfileDetail(props) {
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
          <FemaleIcon />
          &#8197;阿吉&#8197;
          <MaleIcon />
        </Text>
      </View>
      {/* ID */}
      <Text style={{ fontSize: 12, color: colors.main_font, padding: 5 }}>
        ID:84950235
        <CopyIcon
          onPress={() => {
            console.log('拷贝')
          }}
        />
      </Text>
      {/* 介绍 */}
      <Detail />
    </>
  )
}

export default ProfileDetail
