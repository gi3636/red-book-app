import React, { useEffect, useState } from 'react'
import { Text, useToast, View } from 'native-base'
import { useDispatch } from 'react-redux'
import { appEmitter } from '../../../utils/app.emitter'
import { userService } from '../../../api'
import { updateUser } from '../../../store/user/slice'
import colors from '../../../styles/colors'
import { FlatList } from 'react-native'
import TouchableScale from 'react-native-touchable-scale'
import { AntDesign } from '@expo/vector-icons'
import { ListItem } from '@rneui/themed'

function EditSexScreen({ navigation, route }) {
  const [sex, setSex] = useState(route.params || '保密')
  const toast = useToast()
  const dispatch = useDispatch()
  useEffect(() => {
    appEmitter.singleton(appEmitter.type.editData, async () => {
      try {
        let res = await userService.update({ sex })
        if (+res.code === 200) {
          toast.show({
            title: '修改成功',
            duration: 2000
          })
          dispatch(updateUser({ sex }))
          navigation.goBack()
        } else {
          toast.show({
            title: '修改失败',
            duration: 2000
          })
        }
      } catch (e) {
        console.log(e)
      }
    })
  }, [sex])

  let sexList = [
    {
      label: '男'
    },
    {
      label: '女'
    },
    {
      label: '保密'
    }
  ]

  let renderList = ({ item }) => {
    return (
      <>
        <ListItem
          bottomDivider
          Component={TouchableScale}
          friction={90} //
          tension={100} // These props are passed to the parent component (here TouchableScale)
          activeScale={0.95}
          onPress={setSex.bind(null, item.label)}>
          <ListItem.Content>
            <ListItem.Title style={{ color: colors.main_font, minWidth: 70 }}>{item.label}</ListItem.Title>
          </ListItem.Content>
          {sex === item.label && <AntDesign name="check" size={24} color={colors.primary} />}
        </ListItem>
      </>
    )
  }
  return (
    <View padding={5} flex={1} backgroundColor={colors.white_smoke}>
      <Text color={colors.black}>请选择性别</Text>
      <View marginTop={2}>
        <FlatList data={sexList} renderItem={renderList} />
      </View>
    </View>
  )
}

export default EditSexScreen
