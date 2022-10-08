import React from 'react'
import { HStack, View } from 'native-base'
import { Avatar } from '@rneui/base'
import { StyleSheet, Text } from 'react-native'
import colors from '../../styles/colors'
import { AntDesign } from '@expo/vector-icons'
import TouchableScale from 'react-native-touchable-scale'
import { appEmitter } from '../../utils/app.emitter'
import { convertTime } from '../../utils'

function CommentItem({ item, children }: { item: any; children?: any }) {
  return (
    <View style={styles.commentItem} w="100%" flexDirection="row" key={item.id}>
      <View paddingRight={2}>
        <Avatar
          size={35}
          rounded
          source={{
            uri: `https://avatars1.githubusercontent.com/u/${parseInt(String(item.userId * Math.random()))}`
          }}
        />
      </View>

      <View flex={1}>
        <TouchableScale
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() => {
            appEmitter.fire(appEmitter.type.focusCommentInput, {
              toUserId: item.userId,
              parentId: item.parentId || item.id //有parentId则是回复评论，否则是回复笔记
            })
          }}>
          <HStack>
            <Text style={{ color: colors.white, fontWeight: 'bold' }}>{item.nickname}</Text>
            <Text style={{ color: colors.white, fontWeight: 'bold', marginLeft: 10 }}>
              {convertTime(item.createdTime, 'YYYY-MM-DD  HH:mm')}
            </Text>
          </HStack>
          <Text style={{ color: colors.white, fontSize: 15, padding: 4 }}>{item.content}</Text>
          <View />
        </TouchableScale>
        {children}
      </View>

      <View w={6} alignItems="center" marginTop={5}>
        <AntDesign name="hearto" size={16} color="white" />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  commentItem: {
    paddingVertical: 10
  }
})
export default CommentItem
