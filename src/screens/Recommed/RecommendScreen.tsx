import React, { useEffect, useMemo, useState } from 'react'
import MasonryList from '@react-native-seoul/masonry-list'
import { Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import colors from '../../styles/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { api } from '../../api/api'
import PreviewCard from '../../components/PreviewCard/PreviewCard'
import TouchableScale from 'react-native-touchable-scale'
import { throttle } from '../../utils'
import { noteService } from '../../api'
import { useSelector } from 'react-redux'

const screenHeight = Dimensions.get('window').height
function RecommendScreen({ navigation }) {
  // const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Array<any>>([])
  const mySelf = useSelector((state: any) => {
    return state.user
  })
  const refreshData = async () => {
    setLoading(true)
    if (!loading) {
      console.log('刷新数据')
      let res = await noteService.list({ userId: mySelf.id })
      setData(res.data.list)
    }
    setLoading(false)
  }
  const loadingData = throttle(async () => {
    console.log('加载数据')
    let res = await noteService.list({ userId: mySelf.id })
    //@ts-ignore
    setData([...data, ...res.data.list])
    console.log('长度', data.length)
  }, 2000)

  useEffect(() => {
    refreshData()
  }, [])

  const renderNoteList = useMemo(() => {
    return (
      <MasonryList
        data={data}
        keyExtractor={(item): string => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableScale
            key={item.id}
            friction={90}
            tension={100}
            activeScale={0.95}
            onPress={() => {
              navigation.navigate('Note', item)
              console.log('item', item)
            }}>
            <PreviewCard item={item} />
          </TouchableScale>
        )}
        refreshing={loading}
        onRefresh={refreshData}
        onEndReachedThreshold={0.5}
        onEndReached={loadingData}
      />
    )
  }, [data, loading])

  return (
    //<LinearGradient colors={[colors.primary, colors.secondary]} style={styles.background}>
    <ImageBackground
      style={{ flex: 1, backgroundColor: colors.primary }}
      source={require('../../assets/images/bumble-bg.png')}
      resizeMode="contain">
      <View width="100%" height={screenHeight - 25} pt="82">
        {renderNoteList}
      </View>
    </ImageBackground>
    //</LinearGradient>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%'
  }
})

export default RecommendScreen
