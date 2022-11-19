import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import MasonryList from '@react-native-seoul/masonry-list'
import { Tab, TabView } from '@rneui/base'
import { View } from 'native-base'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { noteService } from '../../../api'
import PreviewCard from '../../../components/PreviewCard/PreviewCard'
import colors from '../../../styles/colors'
import { appEmitter } from '../../../utils/app.emitter'
import { NoteQueryParam } from '../../../constants/type/Note'
import TouchableScale from 'react-native-touchable-scale'
import { useNavigation } from '@react-navigation/native'

enum GetDataType {
  Init = 'init', // 初始化
  Load = 'load' // 加载更多
}
enum TabType {
  Personal,
  Liked,
  Favorite
}

function CollectionTab({ user }: { user: any }) {
  const [index, setIndex] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [containerHeight, setContainerHeight] = useState(0)
  const [personalDataList, setPersonalDataList] = useState<any>([])
  const [likeDataList, setLikeDataList] = useState<any>([])
  const [favoriteDataList, setFavoriteDataList] = useState<any>([])
  const navigation = useNavigation()
  const containerRef = React.useRef(null)
  const [personalParam, setPersonalParam] = useState<NoteQueryParam>({
    currentPage: 1,
    size: 10,
    userId: user.id
  })
  const [likedParam, setLikedParam] = useState<NoteQueryParam>({
    currentPage: 1,
    size: 10,
    userId: user.id
  })
  const [favoriteParam, setFavoriteParam] = useState<NoteQueryParam>({
    currentPage: 1,
    size: 10,
    userId: user.id
  })
  let lock = false

  useEffect(() => {
    appEmitter.singleton(appEmitter.type.loadData, loadingData)
  }, [favoriteDataList, likeDataList, personalDataList])

  useEffect(() => {
    refreshData()
  }, [])

  const changeIndex = (value: number) => {
    setIndex(value)
    refreshData(value)
    adjustContainerHeight(0, value)
  }

  /**
   * 获取个人笔记数据
   * @param type
   */
  const getPersonalNoteData = (type: GetDataType) => {
    noteService.getPersonalNoteList(personalParam).then((res) => {
      let length
      if (type === GetDataType.Init) {
        length = res?.data?.list?.length
        setPersonalDataList(res?.data?.list)
      } else {
        length = personalDataList?.length + res?.data?.list?.length
        setPersonalDataList([...personalDataList, ...res?.data?.list])
      }
      adjustContainerHeight(length)
    })
  }

  /**
   * 获取点赞数据
   * @param type
   */
  const getLikeNoteData = (type: GetDataType) => {
    noteService.getLikedNoteList(likedParam).then((res) => {
      let length
      if (type === GetDataType.Init) {
        length = res?.data?.list?.length
        setLikeDataList(res?.data?.list)
      } else {
        length = likeDataList?.length + res?.data?.list?.length
        setLikeDataList([...likeDataList, ...res?.data?.list])
      }
      adjustContainerHeight(length)
    })
  }

  /**
   * 获取收藏数据
   * @param type
   */
  const getFavoriteNoteData = (type: GetDataType) => {
    noteService.getFavoriteNoteList(favoriteParam).then((res) => {
      let length
      if (type === GetDataType.Init) {
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
  const adjustContainerHeight = (length, value?: number) => {
    if (length) {
      let height = Math.ceil(length / 2) * 180
      setContainerHeight(height)
    } else {
      let dataList = [personalDataList, likeDataList, favoriteDataList][value || 0]
      if (dataList?.length) {
        let height = Math.ceil(dataList.length / 2) * 180
        setContainerHeight(height)
      }
    }
  }

  const refreshData = async (value?: number) => {
    if (value) {
      if (value === TabType.Personal && personalDataList.length === 0) {
        getPersonalNoteData(GetDataType.Init)
      } else if (value === TabType.Liked && likeDataList.length === 0) {
        getLikeNoteData(GetDataType.Init)
      } else if (value === TabType.Favorite && favoriteDataList.length === 0) {
        getFavoriteNoteData(GetDataType.Init)
      }
    } else {
      if (!loading) {
        if (index === TabType.Personal) {
          getPersonalNoteData(GetDataType.Init)
        } else if (index === TabType.Favorite) {
          getFavoriteNoteData(GetDataType.Init)
        } else {
          getLikeNoteData(GetDataType.Init)
        }
      }
    }
  }

  const loadingData = useCallback(async () => {
    setLoading(true)
    if (!lock) {
      lock = true
      if (index === TabType.Personal) {
        getPersonalNoteData(GetDataType.Load)
      } else if (index === TabType.Favorite) {
        getFavoriteNoteData(GetDataType.Load)
      } else {
        getLikeNoteData(GetDataType.Load)
      }
      lock = false
    }
    setLoading(false)
  }, [favoriteDataList, likeDataList, personalDataList, containerHeight])

  const renderTab = useMemo(() => {
    let arr = [
      {
        id: TabType.Personal,
        data: personalDataList
      },
      {
        id: TabType.Liked,
        data: likeDataList
      },
      {
        id: TabType.Favorite,
        data: favoriteDataList
      }
    ]
    return arr?.map((obj: any) => {
      return (
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }}>
          <MasonryList
            LoadingView={null}
            data={obj.data}
            keyExtractor={(item): string => item.id}
            numColumns={2}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableScale
                key={item.id}
                friction={100}
                tension={100}
                activeScale={0.98}
                onPress={() => {
                  //@ts-ignore
                  navigation.navigate('Note', item)
                }}>
                <PreviewCard item={item} />
              </TouchableScale>
            )}
            refreshing={loading}
          />
        </TabView.Item>
      )
    })
  }, [likeDataList, favoriteDataList, personalDataList, containerHeight])
  console.log('渲染')
  console.log('containerHeight', containerHeight)
  return (
    <View ref={containerRef} w="100%" style={{ overflow: 'hidden', height: containerHeight, minHeight: '100%' }}>
      <Tab
        value={index}
        onChange={(e) => changeIndex(e)}
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
        <TabView value={index} onChange={changeIndex}>
          {renderTab}
        </TabView>
      ) : null}
    </View>
  )
}

export default CollectionTab
