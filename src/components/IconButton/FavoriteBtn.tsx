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
  const favoriteRef = React.useRef(null)
  const [isFavorite, setIsFavorite] = React.useState(item.isFavorite)

  const pressLike = async () => {
    //@ts-ignore
    favoriteRef.current.bounceIn()
    setIsFavorite(!isFavorite)
    if (isFavorite) {
      item.isFavorite = false
      item.favoriteCount -= 1
    } else {
      item.isFavorite = true
      item.favoriteCount += 1
    }
    let res = isFavorite ? await noteService.cancelFavorite(item.id) : await noteService.favorite(item.id)
    if (+res.code === 200) {
      // appEmitter.emit(appEmitter.type.updateCommentData, item)
    }
  }
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <Pressable onPress={pressLike}>
        <Animatable.View ref={favoriteRef}>
          <AntDesign name={isFavorite ? 'star' : 'staro'} size={size} color={isFavorite ? colors.yellow : 'black'} />
        </Animatable.View>
      </Pressable>
      <Text style={styles.countText}>{item.favoriteCount}</Text>
    </HStack>
  )
}

const styles = StyleSheet.create({
  countText: { color: colors.black, marginLeft: 3, fontSize: 14 }
})

export default FavoriteBtn
