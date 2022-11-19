import React from 'react'
import { FlatList } from 'react-native'
import colors from '../../styles/colors'
import TouchableScale from 'react-native-touchable-scale'
import { Avatar, Flex, View } from 'native-base'
import HorizontalLine from '../../components/HorizontalLine'
import { ListItem } from '@rneui/themed'
import { useSelector } from 'react-redux'
import EditMobileScreen from './components/EditMobileScreen'
import EditNicknameScreen from './components/EditNicknameScreen'
import EditDescriptionScreen from './components/EditDescriptionScreen'
import EditSexScreen from './components/EditSexScreen'
import EditBirthdayScreen from './components/EditBirthdayScreen'
import { convertTime } from '@/utils'

export const userPropsList = [
  {
    name: 'nickname',
    title: '昵称',
    component: EditNicknameScreen
  },
  {
    name: 'mobile',
    title: '手机号',
    component: EditMobileScreen
  },
  {
    name: 'description',
    title: '简介',
    component: EditDescriptionScreen
  },
  {
    name: 'sex',
    title: '性别',
    component: EditSexScreen
  },
  {
    name: 'birthday',
    title: '生日',
    component: EditBirthdayScreen
  }
]

export default function EditScreen({ navigation }) {
  let mySelf = useSelector((state: any) => {
    return state.user
  })

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <>
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95}
        onPress={() => {
          navigation.push(`Edit${item.name[0].toUpperCase() + item.name.substr(1)}`, mySelf[item.name])
        }}>
        <ListItem.Title style={{ color: colors.placeholder, minWidth: 70 }}>{item.title}</ListItem.Title>
        <ListItem.Content>
          <ListItem.Title
            style={{ color: mySelf[item.name] ? colors.main_font : colors.placeholder }}
            lineBreakMode={'tail'}
            numberOfLines={3}>
            {convertData(item.name) || '未设置'}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
      <HorizontalLine style={{ marginTop: 0, backgroundColor: '#cfd3d3' }} />
    </>
  )

  function convertData(name) {
    if (name === 'birthday') {
      return mySelf[name] && convertTime(mySelf[name])
    }
    if (name === 'sex') {
      return mySelf[name] && ['保密', '男', '女'][mySelf[name]]
    }
    return mySelf[name]
  }

  return (
    <View flex={1} backgroundColor={colors.white_smoke}>
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
          <FlatList keyExtractor={keyExtractor} data={userPropsList} renderItem={renderItem} />
        </View>
      </Flex>
    </View>
  )
}
