import React, { useEffect } from 'react'
import { HStack, Pressable } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { noteService } from '../../api'
import { StyleSheet, Text } from 'react-native'
import colors from '../../styles/colors'
import { appEmitter } from '../../utils/app.emitter'

type Props = {
  item: any
  size?: number
}

function LikeBtn({ item, size = 22 }: Props) {
  const likeRef = React.useRef(null)
  const [isLike, setIsLike] = React.useState(item.isLike)
  if (item.isLike !== isLike) {
    setIsLike(item.isLike)
  }

  const pressLike = async () => {
    //@ts-ignore
    likeRef.current.bounceIn()
    setIsLike(!isLike)
    if (isLike) {
      item.isLike = false
      item.likeCount -= 1
    } else {
      item.isLike = true
      item.likeCount += 1
    }
    appEmitter.fire(appEmitter.type.refreshPreviewCard, item.id)
    let res = isLike ? await noteService.unlike(item.id) : await noteService.like(item.id)
    if (+res.code === 200) {
      // appEmitter.emit(appEmitter.type.updateCommentData, item)
    }
  }
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Pressable onPress={pressLike}>
        <Animatable.View ref={likeRef}>
          <AntDesign name={isLike ? 'heart' : 'hearto'} size={size} color={isLike ? 'red' : 'black'} />
        </Animatable.View>
      </Pressable>
      <Text style={styles.countText}>{item.likeCount}</Text>
    </HStack>
  )
}

const styles = StyleSheet.create({
  countText: { color: colors.black, marginLeft: 3, fontSize: 14 }
})

export default LikeBtn
