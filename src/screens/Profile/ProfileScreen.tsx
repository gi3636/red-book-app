/*
 * @Author: franky franky.b@iscmango.com
 * @Date: 2022-09-14 13:12:33
 * @LastEditors: franky franky.b@iscmango.com
 * @LastEditTime: 2022-11-17 17:01:20
 * @FilePath: /red-book-app/src/screens/Profile/ProfileScreen.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LinearGradient } from 'expo-linear-gradient'
import * as React from 'react'
import { Dimensions, ScrollView, StyleSheet } from 'react-native'
import colors from '../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'native-base'
import ProfileHeader from './component/ProfileHeader'
import ProfileBody from './component/ProfileBody'
import { appEmitter } from '../../utils/app.emitter'
/* 屏幕的宽度 */
const screenWidth = Dimensions.get('window').width
/* 屏幕的高度 */
const screenHeight = Dimensions.get('window').height
export default function ProfileScreen({ navigation }) {
  let lock = false
  function handleScrollEnd() {
    console.log('测试')

    if (lock) return
    lock = true
    appEmitter.fire(appEmitter.type.loadData)
    setTimeout(() => {
      lock = false
    }, 3000)
  }
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[colors.primary, colors.secondary]}
      style={styles.linearGradient}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }} onMomentumScrollEnd={handleScrollEnd}>
          <ProfileHeader />
          <ProfileBody navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1
  }
})
