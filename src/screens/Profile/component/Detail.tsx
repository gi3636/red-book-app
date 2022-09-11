import React, { useEffect, useRef } from 'react'
import { Flex, View } from 'native-base'
import { Text } from '@rneui/base'
import colors from '../../../styles/colors'
import HorizontalLine from '../../../components/VerticalLine'
import TouchableScale from 'react-native-touchable-scale'
import * as Animatable from 'react-native-animatable'

function Detail({ myself }) {
  const [collapsed, setCollapsed] = React.useState(true)
  const [collapsedProps, setCollapsedProps] = React.useState({
    /** 文本是否展开 */
    expanded: true,
    numberOfLines: 0,
    /** 展开收起文字是否处于显示状态 */
    showExpandText: false,
    maxHeight: 0,
    minHeight: 0
  })

  const slideDown = {
    from: {
      height: collapsedProps.minHeight
    },
    to: {
      height: collapsedProps.maxHeight
    }
  }

  const handleCollapse = () => {
    setCollapsed(!collapsed)
    setCollapsedProps({ ...collapsedProps, numberOfLines: collapsed ? 100 : 2 })
  }

  useEffect(() => {}, [])

  return (
    <>
      {/* 关注，分数，获得赞*/}
      <View
        style={{
          marginTop: 10,
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
        <HorizontalLine />
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
        <HorizontalLine />
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
        <View
          onLayout={(e) => {
            let { height } = e.nativeEvent.layout
            if (!collapsedProps.maxHeight || !collapsedProps.minHeight) {
              if (!collapsedProps.maxHeight) {
                setCollapsedProps({ ...collapsedProps, maxHeight: height, numberOfLines: 2 })
              } else {
                setCollapsedProps({ ...collapsedProps, minHeight: height, expanded: collapsedProps.maxHeight > height })
              }
            }
          }}>
          <Animatable.Text
            animation={collapsed ? undefined : slideDown}
            numberOfLines={collapsedProps.numberOfLines}
            ellipsizeMode="tail"
            style={{
              color: colors.main_font,
              fontSize: 14
            }}>
            {myself.description}
          </Animatable.Text>
        </View>
        {collapsedProps.expanded && (
          <Flex>
            <TouchableScale friction={90} tension={100} activeScale={0.95} onPress={handleCollapse}>
              <Text
                style={{
                  paddingTop: 2,
                  color: colors.primary,
                  alignSelf: 'flex-end'
                }}>
                {collapsed ? '展开' : '收起'}
              </Text>
            </TouchableScale>
          </Flex>
        )}
      </View>
    </>
  )
}

export default Detail
