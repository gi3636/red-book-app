import React, { useEffect } from 'react'
import { View, Text, Center, Pressable } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { Button } from '@rneui/base'
import { PanGesture, PanGestureHandler } from 'react-native-gesture-handler'
import * as Animatable from 'react-native-animatable'
import { AntDesign } from '@expo/vector-icons'
import { CustomAnimated } from '../constants/CustomAnimated'
function TestAnimatedScreen(props) {
  const progress = useSharedValue(1)
  const scale = useSharedValue(1)
  let size = 100
  let textRef = React.useRef(null)
  let viewRef = React.useRef(null)
  const [like, setLike] = React.useState(false)
  const reanimatedStyles = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ scale: scale.value }, { rotate: `${progress.value * 360}deg` }]
    }
  })

  useEffect(() => {
    //progress.value = withSpring(0)
    scale.value = withTiming(1)
  }, [])

  const onPress = () => {
    //progress.value = withRepeat(withSpring(1), 10)
    //@ts-ignore
    textRef?.current.animate(CustomAnimated.bounce, 1000)
    //@ts-ignore
    viewRef?.current.animate(CustomAnimated.bounce, 1000)
    setLike(!like)
    //scale.value = withRepeat(withTiming(1.5), 2, true)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View justifyContent="center" alignItems="center" flex={1}>
        <Pressable onPress={onPress}>
          <PanGestureHandler>
            <Animated.View
              style={[{ height: size, width: size, backgroundColor: 'blue', borderRadius: 50 }, reanimatedStyles]}
            />
          </PanGestureHandler>
        </Pressable>
        <Animatable.View ref={viewRef}>
          <AntDesign name="heart" size={24} color={like ? 'red' : 'black'} />
        </Animatable.View>
        <Animatable.Text ref={textRef}>Zoom me out</Animatable.Text>
      </View>
    </SafeAreaView>
  )
}

export default TestAnimatedScreen
