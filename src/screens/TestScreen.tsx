import React, { useEffect } from 'react'
import { View, Text, Center, Pressable } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { Button } from '@rneui/base'

function TestScreen(props) {
  const progress = useSharedValue(1)
  const scale = useSharedValue(1)
  let size = 100
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
    scale.value = withRepeat(withTiming(1.2), 2, true)
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View justifyContent="center" alignItems="center" flex={1}>
        <Pressable onPress={onPress}>
          <Animated.View style={[{ height: size, width: size, backgroundColor: 'blue' }, reanimatedStyles]} />
        </Pressable>
      </View>
    </SafeAreaView>
  )
}

export default TestScreen
