import React, { useEffect, useState } from 'react'
import { Text, useToast, View } from 'native-base'
import { useDispatch } from 'react-redux'
import { appEmitter } from '../../../utils/app.emitter'
import { userService } from '../../../api'
import { updateUser } from '../../../store/user/slice'
import colors from '../../../styles/colors'
import CustomInput from '../../../components/CustomInput'

function EditNicknameScreen({ navigation, route }) {
  const [nickname, setNickname] = useState(route.params)
  const toast = useToast()
  const dispatch = useDispatch()
  useEffect(() => {
    appEmitter.singleton(appEmitter.type.editData, async () => {
      try {
        let res = await userService.update({ nickname })
        if (+res.code === 200) {
          toast.show({
            title: '修改成功',
            duration: 2000
          })
          dispatch(updateUser({ nickname }))
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
  }, [nickname])

  return (
    <View padding={5} flex={1} backgroundColor={colors.white_smoke}>
      <Text color={colors.black}>七天内可修改一次昵称</Text>
      <CustomInput
        label="昵称"
        value={nickname}
        onChangeText={setNickname}
        containerStyle={{ marginVertical: 5 }}
        variant={'rounded'}
      />
      <Text color={colors.placeholder}>请设置2-24个字符</Text>
    </View>
  )
}

export default EditNicknameScreen
