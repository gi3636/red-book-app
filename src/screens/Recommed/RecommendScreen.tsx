import { Text, View } from 'native-base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Dimensions } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import { noteService } from '../../api'
import Background from '../../components/Background'
import PreviewCard from '../../components/PreviewCard/PreviewCard'
import { appEmitter } from '@/utils/app.emitter'
import CustomScrollView from '@/components/CustomScrollView'

const screenHeight = Dimensions.get('window').height
function RecommendScreen({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<any>>([])
  let lock: any = useRef<any>(false)
  let page = useRef(1)
  let pageSize = 10
  let totalPageSize = useRef(0)
  const [bottomRefreshing, setBottomRefreshing] = React.useState(false)
  const [isFinished, setIsFinished] = React.useState(false)
  useEffect(() => {
    appEmitter.on(appEmitter.type.updateCommentData, (comment: any) => {
      updateCommentData(comment)
    })
  }, [])

  const refreshData = useCallback(async () => {
    setLoading(true)
    if (!loading) {
      let res = await noteService.getRecommendNoteList(1, pageSize)
      totalPageSize.current = res.data.totalPage
      setData(res.data.list)
    }
    setLoading(false)
  }, [loading, data])

  const loadData = async () => {
    if (!lock.current) {
      lock.current = true
      if (page.current <= totalPageSize.current) {
        setBottomRefreshing(true)
        page.current++
        let res = await noteService.getRecommendNoteList(page.current, pageSize)
        setData(data.concat(res.data.list))
        setBottomRefreshing(false)
      } else {
        //表示没有更多数据
        setIsFinished(true)
      }
      lock.current = false
    }
  }

  useEffect(() => {
    refreshData()
  }, [])

  const updateCommentData = (comment: any) => {
    let newData = data.map((item) => {
      if (item.id === comment.id) {
        item = { ...comment }
      }
      return item
    })
    setData([...newData])
  }

  const renderNoteList = useMemo(() => {
    return (
      <CustomScrollView
        style={{
          height: screenHeight - 25
        }}
        onScrollBegin={refreshData}
        onScrollEnd={loadData}>
        <View>
          <View style={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            {data.map((item) => {
              return (
                <View key={item.id} style={{ width: '50%' }}>
                  <TouchableScale
                    // @ts-ignore
                    key={item.id}
                    friction={100}
                    tension={100}
                    activeScale={0.98}
                    onPress={() => {
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
              marginTop: 10,
              justifyContent: 'center'
            }}>
            {isFinished ? (
              <Text style={{ textAlign: 'center' }}>没有更多了</Text>
            ) : (
              <>
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
              </>
            )}
          </View>
        </View>
      </CustomScrollView>
    )
  }, [data, loading, bottomRefreshing, isFinished])
  return (
    <Background>
      <View width="100%" height={screenHeight - 35} pt="82">
        {renderNoteList}
      </View>
    </Background>
  )
}

export default RecommendScreen
