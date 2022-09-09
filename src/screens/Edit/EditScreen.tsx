import React from 'react'
import { FlatList } from 'react-native'
import colors from '../../styles/colors'
import TouchableScale from 'react-native-touchable-scale'
import { Avatar, Flex, View } from 'native-base'
import HorizontalLine from '../../components/HorizontalLine'
import { ListItem } from '@rneui/themed'

export default function EditScreen({ navigation }) {
  const list = [
    {
      name: 'username',
      title: '用户名',
      value: 'Franky'
    },
    {
      name: 'mobile',
      title: '手机号',
      value: '15623906783'
    },
    {
      name: 'nickname',
      title: '昵称',
      value: '小白'
    },
    {
      name: '城市',
      title: '城市',
      value: '深圳'
    }
  ]

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <>
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95}
        onPress={() => {
          console.log('122')
          navigation.push('EditData')
        }}>
        <ListItem.Content>
          <ListItem.Title style={{ color: colors.placeholder }}>{item.title}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Content style={{ transform: [{ translateX: -80 }] }}>
          <ListItem.Title style={{ color: colors.main_font }}>{item.value}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <HorizontalLine style={{ marginTop: 0, backgroundColor: '#cfd3d3' }} />
    </>
  )

  return (
    <Flex alignItems="center" style={{ paddingTop: 10, backgroundColor: 'white' }}>
      <TouchableScale activeScale={0.95}>
        <Flex alignItems="center">
          <Avatar
            size="xl"
            bg="green.500"
            source={{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
            }}>
            AJ
          </Avatar>
        </Flex>
      </TouchableScale>

      <HorizontalLine style={{ backgroundColor: '#cfd3d3' }} />
      <View w="100%">
        <FlatList keyExtractor={keyExtractor} data={list} renderItem={renderItem} />
      </View>
    </Flex>
  )
}
