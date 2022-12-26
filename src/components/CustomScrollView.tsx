import React from 'react'
import { View, Text } from 'native-base'
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import colors from '@/styles/colors'
import { useSelector } from 'react-redux'
import { appEmitter } from '@/utils/app.emitter'

interface Props {
  style?: ViewStyle
  children: React.ReactNode
  onScrollBegin?: () => Promise<void>

  onScrollEnd?: () => Promise<void>
}

function CustomScrollView({ children, onScrollBegin, onScrollEnd, style }: Props) {
  let lock = false
  const [refreshing, setRefreshing] = React.useState(false)
  const [bottomRefreshing, setBottomRefreshing] = React.useState(false)
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout))
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    console.log('刷新数据')
    onScrollBegin &&
      onScrollBegin().finally(() => {
        setRefreshing(false)
      })
  }, [])
  function handleScrollEnd(e) {
    const offsetY = e.nativeEvent.contentOffset.y //滑动距离
    const originalScrollHeight = e.nativeEvent.layoutMeasurement.height //scrollView高度
    const contentSizeHeight = e.nativeEvent.contentSize.height //scrollView contentSize高度
    if (offsetY + originalScrollHeight >= contentSizeHeight && !lock) {
      setBottomRefreshing(true)
      lock = true
      onScrollEnd &&
        onScrollEnd().finally(() => {
          //setTimeout(() => {
          lock = false
          setBottomRefreshing(false)
          //}, 2000)
        })
    }
  }

  //function handleScrollTop(e) {
  //  const offsetY = e.nativeEvent.contentOffset.y //滑动距离
  //  const originalScrollHeight = e.nativeEvent.layoutMeasurement.height //scrollView高度
  //  const contentSizeHeight = e.nativeEvent.contentSize.height //scrollView contentSize高度
  //  console.log(offsetY, originalScrollHeight, contentSizeHeight)
  //  if (offsetY + originalScrollHeight <= contentSizeHeight && !lock) {
  //    lock = true
  //    onScrollBegin && onScrollBegin()
  //    lock = false
  //  }
  //}

  return (
    <ScrollView
      //onMomentumScrollBegin={handleScrollTop}
      onMomentumScrollEnd={handleScrollEnd}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor="black"
          title={refreshing ? '刷新中' : '下拉刷新'}
          titleColor="black"
          colors={['white', 'gray', 'black']}
          progressBackgroundColor="lightblue"
        />
      }
      style={{ ...styles.container, ...style }}>
      {children}

      <View
        style={{
          height: 40,
          zIndex: 10,
          marginTop: 10,
          justifyContent: 'center'
        }}>
        {bottomRefreshing ? (
          <View>
            <ActivityIndicator size="large" color="black" />
            <Text style={{ textAlign: 'center' }}>刷新中</Text>
          </View>
        ) : (
          <>
            <Text style={{ textAlign: 'center' }}>上拉加载更多...</Text>
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default CustomScrollView

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
