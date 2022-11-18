import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import MasonryList from '@react-native-seoul/masonry-list'
import { Tab, TabView } from '@rneui/base'
import { View } from 'native-base'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, useWindowDimensions } from 'react-native'
import { noteService } from '../../../api'
import PreviewCard from '../../../components/PreviewCard/PreviewCard'
import colors from '../../../styles/colors'
import { appEmitter } from '../../../utils/app.emitter'
import { NoteFavoriteParam, NoteLikedParam, NoteQueryParam } from '../../../constants/type/Note'
import { useSelector } from 'react-redux'

enum getDataType {
  Init = 'init', // 初始化
  Load = 'load' // 加载更多
}

function CollectionTab(props) {
  const [index, setIndex] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [containerHeight, setContainerHeight] = useState(0)
  const self = useSelector((state: any) => state.user)
  const [likeDataList, setLikeDataList] = useState<any>([])
  const [favoriteDataList, setFavoriteDataList] = useState<any>([])
  const [likedParam, setLikedParam] = useState<NoteLikedParam>({
    currentPage: 1,
    size: 10,
    userId: self.id
  })
  const [favoriteParam, setFavoriteParam] = useState<NoteFavoriteParam>({
    currentPage: 1,
    size: 10,
    userId: self.id
  })
  let lock = false

  useEffect(() => {
    appEmitter.on(appEmitter.type.loadData, loadingData)
  }, [favoriteDataList, likeDataList])

  useEffect(() => {
    refreshData()
  }, [])

  /**
   * 获取点赞数据
   * @param type
   */
  const getLikeData = (type: getDataType) => {
    noteService.getLikedNoteList(likedParam).then((res) => {
      console.log('res', res)
      console.log('type', type)
      let length
      if (type === getDataType.Init) {
        length = res?.data?.list?.length
        setLikeDataList(res?.data?.list)
      } else {
        length = likeDataList?.length + res?.data?.list?.length
        setLikeDataList([...likeDataList, ...res?.data?.list])
        console.log('likeDataList', likeDataList)
        console.log('res?.data?.list', res?.data?.list)
      }
      adjustContainerHeight(length)
    })
  }

  /**
   * 获取收藏数据
   * @param type
   */
  const getFavoriteData = (type: getDataType) => {
    noteService.getFavoriteNoteList(favoriteParam).then((res) => {
      let length
      if (type === getDataType.Init) {
        length = res?.data?.list?.length
        setFavoriteDataList(res?.data?.list)
      } else {
        length = favoriteDataList?.length + res?.data?.list?.length
        setFavoriteDataList([...favoriteDataList, ...res?.data?.list])
      }
      adjustContainerHeight(length)
    })
  }

  /**
   * 调整容器高度
   * @param length
   */
  const adjustContainerHeight = (length) => {
    setContainerHeight(Math.ceil(length / 2) * 180)
  }

  const refreshData = async () => {
    setLoading(true)
    if (!loading) {
      //TODO: 有bug过后修复
      if (index === 0) {
        getLikeData(getDataType.Init)
      } else {
        getFavoriteData(getDataType.Init)
      }
    }
    setLoading(false)
  }
  const loadingData = useCallback(async () => {
    setLoading(true)
    if (!lock) {
      lock = true
      if (index === 0) {
        getLikeData(getDataType.Load)
      } else {
        getFavoriteData(getDataType.Load)
      }
      lock = false
    }
    setLoading(false)
  }, [favoriteDataList, likeDataList])

  const renderTab = useMemo(() => {
    let arr = [
      {
        id: 1,
        data: likeDataList
      },
      {
        id: 2,
        data: favoriteDataList
      },
      {
        id: 3,
        data: favoriteDataList
      }
    ]
    return arr?.map((obj: any) => {
      return (
        <TabView.Item style={{ backgroundColor: 'tranparent', width: '100%' }}>
          <MasonryList
            LoadingView={null}
            data={obj.data}
            keyExtractor={(item): string => item.id}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PreviewCard item={item} />}
            refreshing={loading}
            //onRefresh={refreshData}
            // onEndReachedThreshold={0.7}
            // onEndReached={loadingData}
          />
        </TabView.Item>
      )
    })
  }, [likeDataList, favoriteDataList])
  return (
    <View w="100%" style={{ overflow: 'hidden', minHeight: containerHeight || '100%' }}>
      <Tab
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
      {containerHeight ? (
        <TabView value={index} onChange={setIndex}>
          {renderTab}
          {/*<TabView.Item style={{ backgroundColor: 'tranparent', width: '100%' }}>*/}
          {/*  <MasonryList*/}
          {/*    LoadingView={null}*/}
          {/*    data={data}*/}
          {/*    keyExtractor={(item): string => item.id}*/}
          {/*    numColumns={2}*/}
          {/*    scrollEnabled={false}*/}
          {/*    showsVerticalScrollIndicator={false}*/}
          {/*    renderItem={({ item }) => <PreviewCard item={item} />}*/}
          {/*    refreshing={loading}*/}
          {/*    onRefresh={refreshData}*/}
          {/*    // onEndReachedThreshold={0.7}*/}
          {/*    // onEndReached={loadingData}*/}
          {/*  />*/}
          {/*</TabView.Item>*/}
          {/*<TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>*/}
          {/*  <MasonryList*/}
          {/*    data={data}*/}
          {/*    keyExtractor={(item): string => item.id}*/}
          {/*    numColumns={2}*/}
          {/*    showsVerticalScrollIndicator={false}*/}
          {/*    renderItem={({ item }) => <PreviewCard item={item} />}*/}
          {/*    refreshing={loading}*/}
          {/*    onRefresh={refreshData}*/}
          {/*    // onEndReached={loadingData}*/}
          {/*  />*/}
          {/*</TabView.Item>*/}
          {/*<TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>*/}
          {/*  <MasonryList*/}
          {/*    data={data}*/}
          {/*    keyExtractor={(item): string => item.id}*/}
          {/*    numColumns={2}*/}
          {/*    showsVerticalScrollIndicator={false}*/}
          {/*    renderItem={({ item }) => <PreviewCard item={item} />}*/}
          {/*    refreshing={loading}*/}
          {/*    onRefresh={refreshData}*/}
          {/*    // onEndReached={loadingData}*/}
          {/*  />*/}
          {/*</TabView.Item>*/}
        </TabView>
      ) : null}
    </View>
  )
}

export default CollectionTab
