import React from 'react'
import colors from '../../../styles/colors'
import { Flex, View } from 'native-base'
import SettingIcon from '../../../assets/images/setting.svg'
import { useDispatch } from 'react-redux'
import { userLogout } from '../../../store/user/slice'

function ProfileHeader(props) {
  const dispatch = useDispatch()
  return (
    <Flex
      style={{
        position: 'absolute',
        top: 50,
        right: 0,
        zIndex: 10
      }}
      alignItems="center"
      justifyContent="space-between"
      flexDirection="row">
      <View />
      <Flex alignItems="center" flexDirection="row">
        <SettingIcon
          style={{ marginRight: 25, paddingVertical: 20 }}
          onPress={() => {
            dispatch(userLogout())
            console.log('设')
          }}
        />
      </Flex>
    </Flex>
  )
}

export default ProfileHeader
