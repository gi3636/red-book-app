import React, { useEffect } from 'react'
import { HStack, Input, View } from 'native-base'
import colors from '../../../styles/colors'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { appEmitter } from '@/utils/app.emitter'

function BottomInput({ item, total }) {
  const [isFocus, setIsFocus] = React.useState(false)
  const inputRef = React.useRef(null) as any
  const inputWidth = useSharedValue('45%')
  const viewOpacity = useSharedValue(0)

  const send = async () => {
    console.log('send comment')
  }

  const handleBlur = () => {
    setIsFocus(false)
    inputWidth.value = withTiming('85%')
    viewOpacity.value = withTiming(0)
  }

  const handleFocus = () => {
    setIsFocus(true)
    inputWidth.value = withTiming('85%')
    viewOpacity.value = withTiming(1)
  }

  const popUpToolBox = () => {
    appEmitter.fire(appEmitter.type.popUpToolBox)
    console.log('触发事件')
  }

  const withdrawToolBox = () => {
    appEmitter.fire(appEmitter.type.withdrawToolBox)
  }

  useEffect(() => {}, [])

  return (
    <View style={styles.bottomBarContainer}>
      <HStack style={styles.bottomBar}>
        <TouchableOpacity onPress={popUpToolBox}>
          <AntDesign name="pluscircleo" size={24} color={colors.white} style={{ paddingRight: 10 }} />
        </TouchableOpacity>
        <Input
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          //value={comment}
          //onChangeText={(text) => setComment(text)}
          _focus={{ borderColor: colors.primary }}
          _light={styles.input}
          style={{
            width: '85%',
            borderRadius: 10
          }}
          placeholder="聊天..."
          h={10}
        />

        <TouchableOpacity onPress={send}>
          <MaterialCommunityIcons name="send" size={24} color={colors.white} style={{ paddingLeft: 10 }} />
        </TouchableOpacity>
      </HStack>
    </View>
  )
}
const styles = StyleSheet.create({
  bottomBarContainer: {
    width: '100%',
    backgroundColor: colors.primary,
    height: 70,
    alignItems: 'center'
  },
  input: {
    color: 'black',
    backgroundColor: colors.white,
    borderRadius: 30,
    fontSize: 14,
    padding: 1,
    paddingLeft: 4,
    width: '80%'
  },
  bottomBar: {
    borderRadius: 30,
    width: '97%',
    height: 55,
    paddingHorizontal: 10,
    zIndex: 2,
    //justifyContent: 'space-around',
    alignItems: 'center'
  }
})
export default BottomInput
