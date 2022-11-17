import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import MasonryList from '@react-native-seoul/masonry-list'
import { Tab, TabView } from '@rneui/base'
import { View } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native'
import { noteService } from '../../../api'
import PreviewCard from '../../../components/PreviewCard/PreviewCard'
import colors from '../../../styles/colors'
import { appEmitter } from '../../../utils/app.emitter'

function CollectionTab(props) {
  const [index, setIndex] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const tabRef = React.useRef(null)
  let lock = false
  const refreshData = async () => {
    setLoading(true)
    if (!loading) {
      //TODO: 有bug过后修复
      let res = await noteService.getRecommendNoteList()
      setData([...res.data.list, ...res.data.list])
      // setData(res.data.list)
      let length = res.data.list.length * 2
      setContainerHeight(Math.floor(length / 2) * 160)
    }
    setLoading(false)
  }
  const loadingData = async () => {
    setLoading(true)
    if (!lock) {
      lock = true
      let res = await noteService.getRecommendNoteList()
      setData([...data, ...res.data.list])
      let length = data.length + res.data.list.length
      setContainerHeight(Math.floor(length / 2) * 160)
      lock = false
    }
    setLoading(false)
  }
  useEffect(() => {
    console.log('刷新数据')
    appEmitter.on(appEmitter.type.loadData, loadingData)
  }, [data])

  useEffect(() => {
    refreshData()
  }, [])

  return (
    <View w="100%" style={{ overflow: 'hidden', minHeight: containerHeight || '100%' }}>
      <Tab
        onLayout={(e) => {
          console.log('测试', e.nativeEvent.layout)
          Alert.alert('测试', JSON.stringify(e.nativeEvent.layout))
        }}
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{ backgroundColor: 'white', marginBottom: 10 }}
        indicatorStyle={{
          marginLeft: '10%',
          width: '5%',
          backgroundColor: colors.primary,
          height: 4,
          borderWidth: 0,
          borderRadius: 10
        }}>
        <Tab.Item
          containerStyle={{ backgroundColor: 'white' }}
          icon={
            <MaterialCommunityIcons
              name="collage"
              size={26}
              color={index === 0 ? colors.primary : colors.placeholder}
            />
          }
        />
        <Tab.Item
          containerStyle={{ backgroundColor: 'white' }}
          icon={<AntDesign name="heart" size={24} color={index === 1 ? colors.primary : colors.placeholder} />}
        />
        <Tab.Item
          containerStyle={{ backgroundColor: 'white' }}
          icon={<FontAwesome5 name="lock" size={24} color={index === 2 ? colors.primary : colors.placeholder} />}
        />
      </Tab>
      {data.length ? (
        <TabView value={index} onChange={setIndex}>
          <TabView.Item style={{ backgroundColor: 'tranparent', width: '100%' }}>
            <MasonryList
              LoadingView={null}
              data={data}
              keyExtractor={(item): string => item.id}
              numColumns={2}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <PreviewCard item={item} />}
              refreshing={loading}
              onRefresh={refreshData}
              // onEndReachedThreshold={0.7}
              // onEndReached={loadingData}
            />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
            <MasonryList
              data={data}
              keyExtractor={(item): string => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <PreviewCard item={item} />}
              refreshing={loading}
              onRefresh={refreshData}
              // onEndReached={loadingData}
            />
          </TabView.Item>
          <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
            <MasonryList
              data={data}
              keyExtractor={(item): string => item.id}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => <PreviewCard item={item} />}
              refreshing={loading}
              onRefresh={refreshData}
              // onEndReached={loadingData}
            />
          </TabView.Item>
        </TabView>
      ) : null}
    </View>
  )
}

export default CollectionTab
