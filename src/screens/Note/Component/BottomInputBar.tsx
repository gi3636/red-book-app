import React, { useEffect } from 'react'
import { HStack, Input, View } from 'native-base'
import colors from '../../../styles/colors'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { commentService } from '../../../api'
import { appEmitter } from '../../../utils/app.emitter'
import LikeBtn from '../../../components/IconButton/LikeBtn'
import FavoriteBtn from '../../../components/IconButton/FavoriteBtn'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

function BottomInputBar({ item, total }) {
  const [comment, setComment] = React.useState('')
  const [isFocus, setIsFocus] = React.useState(false)
  const [toUserId, setToUserId] = React.useState(null)
  const [parentId, setParentId] = React.useState(null)
  const inputRef = React.useRef(null) as any
  const inputWidth = useSharedValue('45%')
  const viewOpacity = useSharedValue(0)

  const sendComment = async () => {
    let res = await commentService.add({
      noteId: item.id,
      content: comment,
      toUserId,
      parentId
    })
    if (+res.code === 200) {
      handleBlur()
      inputRef && inputRef?.current?.blur()
      setComment('')
      appEmitter.emit(appEmitter.type.addNoteComment, res.data)
    }
    console.log('send comment')
  }

  const reanimatedStyles = useAnimatedStyle(() => {
    return {
      width: inputWidth.value
    }
  })
  const animatedOpacity = useAnimatedStyle(() => {
    return {
      opacity: viewOpacity.value
    }
  })

  const handleBlur = () => {
    setIsFocus(false)
    setToUserId(null)
    setParentId(null)
    inputWidth.value = withTiming('45%')
    viewOpacity.value = withTiming(0)
  }

  const handleFocus = () => {
    setIsFocus(true)
    inputWidth.value = withTiming('85%')
    viewOpacity.value = withTiming(1)
  }

  useEffect(() => {
    appEmitter.on(appEmitter.type.focusCommentInput, (values) => {
      console.log(values)
      inputRef && inputRef?.current?.focus()
      setToUserId(values.toUserId)
      setParentId(values.parentId)
    })
  }, [])

  return (
    <View style={styles.bottomBarContainer}>
      <HStack style={styles.bottomBar}>
        <Animated.View style={reanimatedStyles}>
          <Input
            ref={inputRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={comment}
            onChangeText={(text) => setComment(text)}
            _focus={{ borderColor: colors.primary }}
            _light={styles.input}
            style={{
              borderRadius: 10
            }}
            placeholder="写下你的评论..."
            h={10}
          />
        </Animated.View>

        {!isFocus ? (
          <>
            <LikeBtn item={item} />
            <FavoriteBtn item={item} />
            <TouchableOpacity
              onPress={() => {
                appEmitter.fire(appEmitter.type.focusCommentInput, {})
              }}>
              <HStack alignItems="center" justifyContent="space-between">
                <Ionicons name="chatbox-ellipses-outline" size={22} color="black" />
                <Text style={styles.countText}>{total}</Text>
              </HStack>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={sendComment}>
            <Animated.View style={animatedOpacity}>
              <MaterialCommunityIcons name="send" size={24} color={colors.main_font} style={{ paddingRight: 5 }} />
            </Animated.View>
          </TouchableOpacity>
        )}
      </HStack>
    </View>
  )
}
const styles = StyleSheet.create({
  input: {
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 30,
    fontSize: 14,
    padding: 1,
    paddingLeft: 4
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomBar: {
    borderRadius: 30,
    width: '97%',
    height: 55,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    zIndex: 2,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  countText: { color: colors.black, marginLeft: 3, fontSize: 14 }
})
export default BottomInputBar
