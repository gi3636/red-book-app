import React, { useEffect, useState } from 'react'
import { useToast, View } from 'native-base'
import { useDispatch } from 'react-redux'
import { appEmitter } from '@/utils/app.emitter'
import { userService } from '../../../api'
import { updateUser } from '@/store/user/slice'
import colors from '../../../styles/colors'
import { ListItem } from '@rneui/base'
import TouchableScale from 'react-native-touchable-scale'
import { convertTime } from '@/utils'
import { Dimensions, Platform } from 'react-native'
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const { width } = Dimensions.get('window')
type IOSMode = 'date' | 'time'

function EditBirthdayScreen({ navigation, route }) {
  const [birthday, setBirthday] = useState(route.params)
  const [show, setShow] = useState(false)
  const toast = useToast()
  const dispatch = useDispatch()

  useEffect(() => {
    appEmitter.singleton(appEmitter.type.editData, async () => {
      try {
        let res = (await userService.update({ birthday: birthday })) as any
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
    const currentDate = selectedDate
    setShow(false)
    setBirthday(currentDate.getTime())
  }

  const showMode = (currentMode) => {
    if (Platform.OS === 'android') {
      setShow(false)
      DateTimePickerAndroid.open({
        value: birthday ? new Date(birthday) : new Date(),
        onChange,
        mode: currentMode
      })
    } else {
      setShow(Platform.OS === 'ios')
    }
  }

  const handleConfirm = (date) => {
    console.log('date', date)
    setBirthday(date.getTime())
    hideDatePicker()
  }
  const hideDatePicker = () => {
    setShow(false)
  }
  return (
    <View padding={5} flex={1} backgroundColor={colors.white_smoke}>
      <ListItem
        style={{ position: 'relative' }}
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
      {show && (
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={birthday ? new Date(birthday) : new Date()}
        />
      )}
    </View>
  )
}

export default EditBirthdayScreen
