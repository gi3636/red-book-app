import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import { Tab, TabView } from '@rneui/base'
import { Text, View } from 'native-base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { noteService } from '../../../api'
import PreviewCard from '../../../components/PreviewCard/PreviewCard'
import colors from '../../../styles/colors'
import { appEmitter } from '@/utils/app.emitter'
import { NoteQueryParam } from '@/constants/type/Note'
import TouchableScale from 'react-native-touchable-scale'
import { useNavigation } from '@react-navigation/native'
import CustomScrollView from '@/components/CustomScrollView'
import { Dimensions } from 'react-native'

enum GetDataType {
  Init = 'init', // 初始化
  Load = 'load' // 加载更多
}
enum TabType {
  Personal,
  Liked,
  Favorite
}

const screenHeight = Dimensions.get('window').height

function CollectionTab({ user }: { user: any }) {
  const [index, setIndex] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [containerHeight, setContainerHeight] = useState(0)
  const [personalDataList, setPersonalDataList] = useState<any>([])
  const [likeDataList, setLikeDataList] = useState<any>([])
  const [favoriteDataList, setFavoriteDataList] = useState<any>([])
  const navigation = useNavigation()
  const containerRef = React.useRef(null)
  const boxHeight = 180
  //const [personalParam, setPersonalParam] = useState<NoteQueryParam>()
  const defaultParam: NoteQueryParam = {
    currentPage: 1,
    size: 10,
    userId: user.id
  }
  const personalParam = useRef(defaultParam)
  const likedParam = useRef(defaultParam)
  const favoriteParam = useRef(defaultParam)

  const totalPage = useRef({
    personal: 0,
    liked: 0,
    favorite: 0
  })
  const lengthObj = useRef({
    personal: 1,
    liked: 1,
    favorite: 1
  })
  const [isFinish, setIsFinish] = useState(false)

  let lock = false

  useEffect(() => {
    appEmitter.singleton(appEmitter.type.loadData, loadData)
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
    if (type === GetDataType.Init) {
      noteService.getPersonalNoteList(defaultParam).then((res) => {
        lengthObj.current.personal = res?.data?.list?.length
        setPersonalDataList(res?.data?.list)
        totalPage.current.personal = res?.data?.totalPage
        //初始化，要不然currentPage会一直增加
        personalParam.current = defaultParam
        adjustContainerHeight(lengthObj.current.personal)
        if (personalParam.current.currentPage >= totalPage.current.personal) {
          setIsFinish(true)
        }
      })
    } else {
      if (personalParam.current.currentPage >= totalPage.current.personal) {
        setIsFinish(true)
        return
      }
      personalParam.current.currentPage += 1
      noteService.getPersonalNoteList(personalParam.current).then((res) => {
        lengthObj.current.personal = personalDataList?.length + res?.data?.list?.length
        setPersonalDataList([...personalDataList, ...res?.data?.list])
        adjustContainerHeight(lengthObj.current.personal)
      })
    }
  }

  /**
   * 获取点赞数据
   * @param type
   */
  const getLikeNoteData = (type: GetDataType) => {
    if (type === GetDataType.Init) {
      noteService.getLikedNoteList(defaultParam).then((res) => {
        lengthObj.current.liked = res?.data?.list?.length
        setLikeDataList(res?.data?.list)
        totalPage.current.liked = res?.data?.totalPage
        //初始化，要不然currentPage会一直增加
        likedParam.current = defaultParam
        adjustContainerHeight(lengthObj.current.liked)
        if (likedParam.current.currentPage >= totalPage.current.liked) {
          setIsFinish(true)
        }
      })
    } else {
      if (likedParam.current.currentPage >= totalPage.current.liked) {
        setIsFinish(true)
        return
      }
      likedParam.current.currentPage += 1
      noteService.getLikedNoteList(likedParam.current).then((res) => {
        lengthObj.current.liked = likeDataList?.length + res?.data?.list?.length
        setLikeDataList([...likeDataList, ...res?.data?.list])
        adjustContainerHeight(lengthObj.current.liked)
      })
    }
  }

  /**
   * 获取收藏数据
   * @param type
   */
  const getFavoriteNoteData = (type: GetDataType) => {
    if (type === GetDataType.Init) {
      noteService.getFavoriteNoteList(defaultParam).then((res) => {
        lengthObj.current.liked = res?.data?.list?.length
        setFavoriteDataList(res?.data?.list)
        totalPage.current.favorite = res?.data?.totalPage
        //初始化，要不然currentPage会一直增加
        favoriteParam.current = defaultParam
        adjustContainerHeight(lengthObj.current.favorite)
        if (favoriteParam.current.currentPage >= totalPage.current.favorite) {
          setIsFinish(true)
        }
      })
    } else {
      if (favoriteParam.current.currentPage >= totalPage.current.favorite) {
        setIsFinish(true)
        return
      }
      favoriteParam.current.currentPage += 1
      noteService.getFavoriteNoteList(favoriteParam.current).then((res) => {
        lengthObj.current.favorite = favoriteDataList?.length + res?.data?.list?.length
        setFavoriteDataList([...favoriteDataList, ...res?.data?.list])
        adjustContainerHeight(lengthObj.current.favorite)
      })
    }
  }

  /**
   * 调整容器高度
   * @param length
   */
  const adjustContainerHeight = (length, value?: number) => {
    if (length) {
      if (length < 5) {
        let height = Math.ceil(length / 2) * 220
        setContainerHeight(height)
      } else {
        let height = Math.ceil(length / 2) * boxHeight
        setContainerHeight(height)
      }
    } else {
      let dataList = [personalDataList, likeDataList, favoriteDataList][value || 0]
      switch (value) {
        case 0:
          length = lengthObj.current.personal
          break
        case 1:
          length = lengthObj.current.liked
          break
        case 2:
          length = lengthObj.current.favorite
          break
      }

      if (dataList?.length) {
        if (dataList?.length < 5) {
          let height = Math.ceil(dataList?.length / 2) * 220
          setContainerHeight(height)
        } else {
          let height = Math.ceil(dataList?.length / 2) * boxHeight
          setContainerHeight(height)
        }
      }
    }
  }

  const refreshData = async (value?: number) => {
    if (value) {
      switch (value) {
        case TabType.Personal:
          if (personalDataList?.length) {
            return
          }
          setIsFinish(false)
          getPersonalNoteData(GetDataType.Init)
          break
        case TabType.Liked:
          if (likeDataList?.length) {
            return
          }
          setIsFinish(false)
          getLikeNoteData(GetDataType.Init)
          break
        case TabType.Favorite:
          if (favoriteDataList?.length) {
            return
          }
          setIsFinish(false)
          getFavoriteNoteData(GetDataType.Init)
          break
      }
    } else {
      if (!loading) {
        switch (index) {
          case TabType.Personal:
            if (personalDataList?.length) {
              return
            }
            getPersonalNoteData(GetDataType.Init)
            break
          case TabType.Liked:
            if (likeDataList?.length) {
              return
            }
            getLikeNoteData(GetDataType.Init)
            break
          case TabType.Favorite:
            if (favoriteDataList?.length) {
              return
            }
            getFavoriteNoteData(GetDataType.Init)
            break
        }
      }
    }
  }

  const loadData = useCallback(async () => {
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
    return arr?.map((obj: any, index) => {
      return (
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }} key={index}>
          <CustomScrollView
            scrollEnabled={false}
            style={{
              height: screenHeight - 25
            }}
            onScrollBegin={refreshData}
            onScrollEnd={loadData}>
            <>
              <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
                {obj?.data.map((item) => {
                  return (
                    <View key={item.id} style={{ width: '50%' }}>
                      <TouchableScale
                        // @ts-ignore
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
                    </View>
                  )
                })}
              </View>
              <View
                style={{
                  height: 40,
                  zIndex: 10,
                  justifyContent: 'center'
                }}>
                {isFinish && <Text style={{ textAlign: 'center' }}>没有更多了</Text>}
              </View>
            </>
          </CustomScrollView>
        </TabView.Item>
      )
    })
  }, [likeDataList, favoriteDataList, personalDataList, containerHeight, isFinish])

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
