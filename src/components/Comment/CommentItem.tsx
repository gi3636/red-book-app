import React from 'react'
import { View } from 'native-base'
import { Avatar } from '@rneui/base'
import { StyleSheet, Text } from 'react-native'
import colors from '../../styles/colors'
import { AntDesign } from '@expo/vector-icons'
import TouchableScale from 'react-native-touchable-scale'
import { appEmitter } from '../../utils/app.emitter'

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
            appEmitter.fire(appEmitter.type.focusCommentInput, { userId: item.userId, parentId: item.id })
          }}>
          <Text
            style={{ color: colors.white, fontWeight: 'bold' }}
            onPress={() => {
              console.log('测试')
            }}>
            Martin
          </Text>
          <Text style={{ color: colors.white }}>{item.content}</Text>
          <View />
          {children}
        </TouchableScale>
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
