import React from 'react'
import { Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { StyleSheet } from 'react-native'
import colors from '../../styles/colors'

type Props = {
  onPress: () => void
  value: boolean
  size?: number
}

function FavoriteBtn({ onPress, value, size = 22 }: Props) {
  const likeRef = React.useRef(null)
  const pressLike = () => {
    //@ts-ignore
    likeRef.current.bounceIn()
    onPress && onPress()
  }
  return (
    <Pressable onPress={pressLike}>
      <Animatable.View ref={likeRef}>
        <AntDesign name={value ? 'star' : 'staro'} size={size} color={value ? colors.yellow : 'black'} />
      </Animatable.View>
    </Pressable>
  )
}

export default FavoriteBtn
