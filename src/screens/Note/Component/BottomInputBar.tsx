import React, { useEffect } from 'react'
import { HStack, Input, View } from 'native-base'
import colors from '../../../styles/colors'
import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { commentService } from '../../../api'
import { appEmitter } from '../../../utils/app.emitter'

function BottomInputBar({ item }) {
  const [comment, setComment] = React.useState('')
  const [isFocus, setIsFocus] = React.useState(false)
  const [toUserId, setToUserId] = React.useState(null)
  const [parentId, setParentId] = React.useState(null)
  const inputRef = React.useRef(null) as any
  console.log('item', item)
  const sendComment = async () => {
    let res = await commentService.add({
      noteId: item.id,
      content: comment,
      toUserId,
      parentId
    })
    console.log('res', res)
    if (+res.code === 200) {
      handleBlur()
      inputRef && inputRef?.current?.blur()
      setComment('')
      appEmitter.emit(appEmitter.type.addNoteComment, res.data)
    }
    console.log('send comment')
  }

  const handleBlur = () => {
    setIsFocus(false)
    setToUserId(null)
    setParentId(null)
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
        <Input
          ref={inputRef}
          onFocus={setIsFocus.bind(null, true)}
          onBlur={handleBlur}
          value={comment}
          onChangeText={(text) => setComment(text)}
          _focus={{ borderColor: colors.primary }}
          _light={{
            color: 'black',
            backgroundColor: 'white',
            borderRadius: 30,
            fontSize: 14,
            padding: 1,
            paddingLeft: 4
          }}
          style={{
            borderRadius: 10
          }}
          placeholder="写下你的评论..."
          width={!isFocus ? '45%' : '85%'}
          h={10}
        />

        {!isFocus ? (
          <>
            <HStack alignItems="center" justifyContent="space-between">
              <AntDesign name="hearto" size={22} color="black" />
              <Text style={{ color: colors.black, marginLeft: 3, fontSize: 14 }}>20</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <AntDesign name="staro" size={22} color="black" />
              <Text style={{ color: colors.black, marginLeft: 3, fontSize: 14 }}>20</Text>
            </HStack>
            <HStack alignItems="center" justifyContent="space-between">
              <Ionicons name="chatbox-ellipses-outline" size={22} color="black" />
              <Text style={{ color: colors.black, marginLeft: 3, fontSize: 14 }}>20</Text>
            </HStack>
          </>
        ) : (
          <TouchableOpacity onPress={sendComment}>
            <MaterialCommunityIcons name="send" size={24} color={colors.main_font} style={{ paddingRight: 5 }} />
          </TouchableOpacity>
        )}
      </HStack>
    </View>
  )
}
const styles = StyleSheet.create({
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
  }
})
export default BottomInputBar
