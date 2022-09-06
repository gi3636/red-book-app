import React from 'react'
import colors from '../../../styles/colors'
import { Flex, View } from 'native-base'
import SettingIcon from '../../../assets/images/setting.svg'

function ProfileHeader(props) {
  return (
    <Flex alignItems="center" justifyContent="space-between" flexDirection="row" backgroundColor={colors.primary}>
      <View />
      <Flex alignItems="center" flexDirection="row">
        <SettingIcon
          style={{ marginRight: 25, paddingVertical: 20 }}
          onPress={() => {
            console.log('设定')
          }}
        />
      </Flex>
    </Flex>
  )
}

export default ProfileHeader
