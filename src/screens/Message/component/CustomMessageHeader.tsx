import React from 'react'
import { Text, View } from 'native-base'
import { useRoute } from '@react-navigation/native'
import { Avatar } from '@rneui/base'
import { Dimensions } from 'react-native'

const width = Dimensions.get('window').width
function CustomMessageHeader(props) {
  const route = useRoute()
  const item: any = route.params
  return (
    <View width={width - 150} justifyContent="center" alignItems="center">
      <Text fontSize="md" color="white">
        {item.nickname}
      </Text>
    </View>
  )
}

export default CustomMessageHeader
