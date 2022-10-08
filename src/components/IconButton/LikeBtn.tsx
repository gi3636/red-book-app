import React from 'react'
import { Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'

type Props = {
  onPress: () => void
  value: boolean
  size?: number
}

function LikeBtn({ onPress, value, size = 22 }: Props) {
  const likeRef = React.useRef(null)
  const pressLike = () => {
    //@ts-ignore
    likeRef.current.bounceIn()
    onPress && onPress()
  }
  return (
    <Pressable onPress={pressLike}>
      <Animatable.View ref={likeRef}>
        <AntDesign name={value ? 'heart' : 'hearto'} size={size} color={value ? 'red' : 'black'} />
      </Animatable.View>
    </Pressable>
  )
}

export default LikeBtn
