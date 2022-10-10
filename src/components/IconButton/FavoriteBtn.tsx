import React from 'react'
import { HStack, Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { noteService } from '../../api'
import { StyleSheet, Text } from 'react-native'
import colors from '../../styles/colors'

type Props = {
  item: any
  size?: number
}

function FavoriteBtn({ item, size = 22 }: Props) {
  const likeRef = React.useRef(null)
  const [isLike, setIsLike] = React.useState(item.isLike)
  let lock = false

  const pressLike = async () => {
    if (lock) return
    lock = true
    let res = isLike ? await noteService.unlike(item.id) : await noteService.like(item.id)
    if (+res.code === 200) {
      lock = false
      if (isLike) {
        item.isLike = false
        item.likeCount -= 1
      } else {
        item.isLike = true
        item.likeCount += 1
      }
      setIsLike(!isLike)
      //@ts-ignore
      likeRef.current.bounceIn()
    }
  }
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Pressable onPress={pressLike}>
        <Animatable.View ref={likeRef}>
          <AntDesign name={isLike ? 'star' : 'staro'} size={size} color={isLike ? colors.yellow : 'black'} />
        </Animatable.View>
      </Pressable>
      <Text style={styles.countText}>{item.likeCount}</Text>
    </HStack>
  )
}

const styles = StyleSheet.create({
  countText: { color: colors.black, marginLeft: 3, fontSize: 14 }
})

export default FavoriteBtn
