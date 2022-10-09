import React, { useEffect, useState } from 'react'
import { useToast, View } from 'native-base'
import { useDispatch } from 'react-redux'
import { appEmitter } from '../../../utils/app.emitter'
import { userService } from '../../../api'
import { updateUser } from '../../../store/user/slice'
import colors from '../../../styles/colors'
import { ListItem } from '@rneui/base'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import TouchableScale from 'react-native-touchable-scale'
import { convertTime } from '../../../utils'

function EditBirthdayScreen({ navigation, route }) {
  const [birthday, setBirthday] = useState(route.params)
  const toast = useToast()
  const dispatch = useDispatch()

  useEffect(() => {
    appEmitter.singleton(appEmitter.type.editData, async () => {
      try {
        let res = await userService.update({ birthday })
        if (+res.code === 200) {
          toast.show({
            title: '修改成功',
            duration: 2000
          })
          dispatch(updateUser({ birthday: birthday }))
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
  }, [birthday])

  const onChange = (event, selectedDate) => {
    setBirthday(selectedDate.getTime())
  }
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: birthday ? new Date(birthday) : new Date(),
      onChange,
      mode: currentMode
    })
  }
  return (
    <View padding={5} flex={1} backgroundColor={colors.white_smoke}>
      <ListItem
        Component={TouchableScale}
        friction={90} //
        tension={100} // These props are passed to the parent component (here TouchableScale)
        activeScale={0.95} //
        onPress={showMode.bind(null, 'date')}>
        <ListItem.Title style={{ color: colors.placeholder, minWidth: 70 }}>生日信息</ListItem.Title>
        <ListItem.Content>
          <ListItem.Title style={{ color: birthday ? colors.main_font : colors.placeholder }}>
            {birthday ? convertTime(birthday) : '未设置'}
          </ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </View>
  )
}

export default EditBirthdayScreen
