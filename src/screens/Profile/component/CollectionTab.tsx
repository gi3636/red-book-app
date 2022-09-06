import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'native-base'
import { Tab, TabView, Text } from '@rneui/base'
import colors from '../../../styles/colors'
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'
import MasonryList from '@react-native-seoul/masonry-list'
import { api } from '../../../api/api'
import PreviewCard from '../../../components/PreviewCard/PreviewCard'

function CollectionTab(props) {
  const [index, setIndex] = React.useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const refreshData = async () => {
    setLoading(true)
    if (!loading) {
      let res = await api.get('https://mock.apifox.cn/m1/1170334-0-default/recommed')
      console.log('res', res)
      setData(res.data)
    }
    setLoading(false)
  }
  const loadingData = async () => {
    setLoading(true)
    if (!loading) {
      let res = await api.get('https://mock.apifox.cn/m1/1170334-0-default/recommed')
      console.log('res', res)
      //@ts-ignore
      setData([...data, ...res.data])
    }
    setLoading(false)
  }
  useEffect(() => {
    refreshData()
  }, [])
  return (
    <View w="100%" h="1000" style={{ overflow: 'hidden', backgroundColor: 'white' }}>
      <Tab
        value={index}
        onChange={(e) => setIndex(e)}
        containerStyle={{ backgroundColor: 'white' }}
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
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <MasonryList
            data={data}
            keyExtractor={(item): string => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PreviewCard item={item} />}
            refreshing={loading}
            onRefresh={refreshData}
            onEndReachedThreshold={0.2}
            onEndReached={loadingData}
          />
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <Text>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'white', width: '100%' }}>
          <Text>Cart</Text>
        </TabView.Item>
      </TabView>
    </View>
  )
}

export default CollectionTab
