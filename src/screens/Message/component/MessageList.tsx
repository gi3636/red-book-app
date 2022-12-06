import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Avatar } from '@rneui/base'
import colors from '@/styles/colors'
import MessageItem from '@/screens/Message/component/MessageItem'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { appEmitter } from '@/utils/app.emitter'

const screenHeight = Dimensions.get('window').height
function MessageList(props) {
  //const [isPopUp, setIsPopUp] = useState(false)
  const isPopUp = useRef(false)
  const scrollViewHeight = useSharedValue(screenHeight - 160)
  const scrollViewRef = useRef(null)
  const popUpToolBox = () => {
    if (isPopUp.current) {
      isPopUp.current = false
      scrollViewHeight.value = withTiming(screenHeight - 160)
    } else {
      isPopUp.current = true
      scrollViewHeight.value = withTiming(screenHeight - 240)
    }
    console.log('scrollViewRef', scrollViewRef)
    setTimeout(() => {
      //@ts-ignore
      //scrollViewRef?.current?.scrollToEnd()
    }, 100)
  }

  useEffect(() => {
    appEmitter.singleton(appEmitter.type.popUpToolBox, () => {
      popUpToolBox()
    })

    setTimeout(() => {
      //@ts-ignore
      scrollViewRef?.current?.scrollToEnd(false)
    })
    console.log('绑定事件')
  }, [])

  const reanimatedStyles = useAnimatedStyle(() => {
    return {
      height: scrollViewHeight.value
    }
  })

  return (
    <Animated.View style={reanimatedStyles}>
      <ScrollView
        style={styles.scrollContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          console.log(scrollViewRef)
        }}>
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: screenHeight - 160,
    backgroundColor: colors.white
  }
})
export default MessageList
