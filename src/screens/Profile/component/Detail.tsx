import React from 'react'
import { Flex, View } from 'native-base'
import { Text } from '@rneui/base'
import colors from '../../../styles/colors'

function Detail(props) {
  return (
    <>
      {/* 关注，分数，获得赞*/}
      <View
        style={{
          marginLeft: '3%',
          width: '95%',
          flexDirection: 'row',
          justifyContent: 'space-around'
        }}>
        {/* 关注 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                color: colors.main_font,
                paddingBottom: 5
              }}>
              2545
            </Text>
            <Text style={{ fontSize: 14, color: colors.main_font }}>关注中</Text>
          </View>
        </View>
        {/* 竖线 */}
        <View
          style={{
            marginTop: 5,
            backgroundColor: colors.placeholder,
            width: 1,
            height: '80%',
            borderRadius: 20
          }}
        />
        {/* 粉丝 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                color: colors.main_font,
                paddingBottom: 5
              }}>
              2545
            </Text>
            <Text style={{ fontSize: 14, color: colors.main_font }}>粉丝</Text>
          </View>
        </View>
        {/* 竖线 */}
        <View
          style={{
            marginTop: 5,
            backgroundColor: colors.placeholder,
            width: 1,
            height: '80%',
            borderRadius: 20
          }}
        />
        {/* 获赞 */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 18,
                color: colors.main_font,
                paddingBottom: 5
              }}>
              2545
            </Text>
            <Text style={{ fontSize: 14, color: colors.main_font }}>获赞</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingTop: 10 }}>
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={{
            color: colors.main_font,
            fontSize: 14
          }}>
          当来到一个新环境时，时常需要我们进行一个自我介绍，自我介绍是人与人进行沟通的出发点。写起自我自我介绍是人与人进行沟通的出发点。写起自
          份未发未发对方快来解放昆仑山搭街坊去给分effe
        </Text>
        <Flex>
          <Text
            style={{
              paddingTop: 2,
              color: colors.primary,
              alignSelf: 'flex-end'
            }}>
            查看更多
          </Text>
        </Flex>
      </View>
    </>
  )
}

export default Detail
