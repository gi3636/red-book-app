import MasonryList from '@react-native-seoul/masonry-list'
import { View } from 'native-base'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import { noteService } from '../../api'
import Background from '../../components/Background'
import PreviewCard from '../../components/PreviewCard/PreviewCard'
import { throttle } from '../../utils'
import { appEmitter } from '../../utils/app.emitter'

const screenHeight = Dimensions.get('window').height
function RecommendScreen({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<any>>([])
  let lock: any = useRef<any>(false)

  useEffect(() => {
    appEmitter.on(appEmitter.type.updateCommentData, (comment: any) => {
      updateCommentData(comment)
    })
  }, [])

  const refreshData = useCallback(async () => {
    setLoading(true)
    if (!loading) {
      console.log('刷新数据')
      let res = await noteService.getRecommendNoteList()
      setData(res.data.list)
    }
    setLoading(false)
  }, [loading, data])

  const loadingData = throttle(async () => {
    console.log(' lock.current ', lock.current)
    if (!lock.current) {
      lock.current = true
      let res = await noteService.getRecommendNoteList()
      //@ts-ignore
      setData([...data, ...res.data.list])
      console.log('长度', data.length)
      lock.current = false
    }
  }, 1000)

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
      <MasonryList
        data={data}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
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
        )}
        refreshing={loading}
        onRefresh={refreshData}
        onEndReachedThreshold={0.3}
        onEndReached={loadingData}
      />
    )
  }, [data, loading])
  return (
    <Background>
      <View width="100%" height={screenHeight - 25} pt="82">
        {renderNoteList}
      </View>
    </Background>
  )
}

export default RecommendScreen
