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
import { ScrollView, StyleSheet } from 'react-native'
import colors from '../../styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProfileHeader from './component/ProfileHeader'
import ProfileBody from './component/ProfileBody'
import { appEmitter } from '@/utils/app.emitter'
import { useSelector } from 'react-redux'

export default function ProfileScreen({ navigation, route }) {
  let lock = false
  let myself = useSelector((state: any) => state.user)
  //没有传参表示是自己的主页
  let user = route.params || myself

  function handleScrollEnd(e) {
    const offsetY = e.nativeEvent.contentOffset.y //滑动距离
    const originalScrollHeight = e.nativeEvent.layoutMeasurement.height //scrollView高度
    const contentSizeHeight = e.nativeEvent.contentSize.height //scrollView contentSize高度
    if (offsetY + originalScrollHeight >= contentSizeHeight && !lock) {
      lock = true
      appEmitter.fire(appEmitter.type.loadData)
      setTimeout(() => {
        lock = false
      }, 3000)
    }
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
          <ProfileBody navigation={navigation} user={user} />
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
