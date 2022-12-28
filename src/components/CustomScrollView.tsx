import React from 'react'
import { RefreshControl, ScrollView, StyleSheet, ViewStyle } from 'react-native'

interface Props {
  style?: ViewStyle
  children: React.ReactNode
  onScrollBegin?: () => Promise<void>

  onScrollEnd?: () => Promise<void>
  scrollEnabled?: boolean
}

function CustomScrollView({ children, onScrollBegin, onScrollEnd, style, scrollEnabled }: Props) {
  let lock = false
  const [refreshing, setRefreshing] = React.useState(false)
  const [bottomRefreshing, setBottomRefreshing] = React.useState(false)

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
          lock = false
          setBottomRefreshing(false)
        })
    }
  }

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
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
    </ScrollView>
  )
}

export default CustomScrollView

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
