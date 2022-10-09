import React from 'react'
import { Button } from '@rneui/base'
import colors from '../../../styles/colors'
import { Entypo } from '@expo/vector-icons'

function DislikeBtn(props) {
  return (
    <Button
      containerStyle={{
        borderRadius: 20,
        borderColor: colors.white,
        borderWidth: 1
      }}
      titleStyle={{ fontSize: 11 }}
      buttonStyle={{
        padding: 3,
        backgroundColor: colors.primary
      }}>
      不喜欢
      <Entypo name="emoji-sad" size={14} color="white" style={{ paddingLeft: 4 }} />
    </Button>
  )
}

export default DislikeBtn
