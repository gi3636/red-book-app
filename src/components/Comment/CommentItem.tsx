import React from 'react'
import { View } from 'native-base'
import { Avatar } from '@rneui/base'
import { StyleSheet, Text } from 'react-native'
import colors from '../../styles/colors'
import { AntDesign } from '@expo/vector-icons'
import TouchableScale from 'react-native-touchable-scale'

function CommentItem({ item, children }: { item: any; children?: any }) {
  return (
    <View style={styles.commentItem} w="100%" flexDirection="row">
      <View paddingRight={2}>
        <Avatar
          size={35}
          rounded
          source={{
            uri: `https://avatars1.githubusercontent.com/u/${parseInt(String(item.avatar * Math.random()))}`
          }}
        />
      </View>

      <View flex={1}>
        <TouchableScale
          friction={90}
          tension={100}
          activeScale={0.95}
          onPress={() => {
            console.log('测试01')
          }}>
          <Text
            style={{ color: colors.white, fontWeight: 'bold' }}
            onPress={() => {
              console.log('测试')
            }}>
            Martin
          </Text>
          <Text style={{ color: colors.white }}>
            这是一条评论的内容里面有很多多多多多多多多多多的内容里面有很多多多多多多多多多多多多多多多多多多多多多多多多
          </Text>
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
