import React, { useEffect, useMemo, useState } from 'react'
import MasonryList from '@react-native-seoul/masonry-list'
import { Dimensions, ImageBackground, StyleSheet } from 'react-native'
import { Text, View } from 'native-base'
import colors from '../../styles/colors'
import { LinearGradient } from 'expo-linear-gradient'
import { api } from '../../api/api'
import throttle from 'lodash/throttle'
import PreviewCard from '../../components/PreviewCard/PreviewCard'
import TouchableScale from 'react-native-touchable-scale'

const screenHeight = Dimensions.get('window').height
function RecommendScreen({ navigation }) {
  // const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const refreshData = async () => {
    setLoading(true)
    if (!loading) {
      let res = await api.get('https://mock.apifox.cn/m1/1170334-0-default/recomment')
      console.log('res', res)
      setData(res.data)
    }
    setLoading(false)
  }
  const loadingData = async () => {
    setLoading(true)
    if (!loading) {
      let res = await api.get('https://mock.apifox.cn/m1/1170334-0-default/recomment')
      console.log('res', res)
      //@ts-ignore
      setData([...data, ...res.data])
    }
    setLoading(false)
  }
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
        onEndReachedThreshold={0.2}
        onEndReached={loadingData}
      />
    )
  }, [data, loading])

  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.background}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/bumble-bg.png')} resizeMode="contain">
        <View width="100%" height={screenHeight - 25} pt="82">
          {data.length > 0 && renderNoteList}
        </View>
      </ImageBackground>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%'
  }
})

export default RecommendScreen
