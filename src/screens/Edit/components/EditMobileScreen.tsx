import React, { useEffect, useState } from 'react'
import { Text, useToast, View } from 'native-base'
import { useDispatch } from 'react-redux'
import { appEmitter } from '@/utils/app.emitter'
import { userService } from '../../../api'
import { updateUser } from '@/store/user/slice'
import colors from '../../../styles/colors'
import CustomInput from '../../../components/CustomInput'

function EditMobileScreen({ route, navigation }) {
  const [mobile, setMobile] = useState(route.params)
  const toast = useToast()
  const dispatch = useDispatch()
  useEffect(() => {
    appEmitter.singleton(appEmitter.type.editData, async () => {
      try {
        let res = await userService.update({ nickname: mobile })
        if (+res.code === 200) {
          toast.show({
            title: '修改成功',
            duration: 2000
          })
          dispatch(updateUser({ nickname: mobile }))
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
  }, [mobile])

  return (
    <View padding={5} flex={1} backgroundColor={colors.white_smoke}>
      <Text color={colors.black}>七天内可修改一次手机号</Text>
      <CustomInput
        label="昵称"
        value={mobile}
        onChangeText={setMobile}
        variant={'rounded'}
        containerStyle={{ marginVertical: 5 }}
      />
      <Text color={colors.placeholder} />
    </View>
  )
}

export default EditMobileScreen
