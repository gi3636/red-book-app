import React, { useEffect, useState } from 'react'
import { Text, useToast, View } from 'native-base'
import { useDispatch } from 'react-redux'
import { appEmitter } from '../../../utils/app.emitter'
import { userService } from '../../../api'
import { updateUser } from '../../../store/user/slice'
import colors from '../../../styles/colors'
import CustomTextArea from '../../../components/CustomTextArea'

function EditDescriptionScreen({ navigation, route }) {
  const [description, setDescription] = useState(route.params)
  const toast = useToast()
  const dispatch = useDispatch()
  const maxCharLimit = 100
  useEffect(() => {
    appEmitter.singleton(appEmitter.type.editData, async () => {
      if (description.length > maxCharLimit) {
        toast.show({
          title: '简介不能超过100个字'
        })
        return
      }
      try {
        let res = await userService.update({ description })
        if (+res.code === 200) {
          toast.show({
            title: '修改成功',
            duration: 2000
          })
          dispatch(updateUser({ description }))
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
  }, [description])

  return (
    <View padding={5} flex={1} backgroundColor={colors.white_smoke}>
      <Text color={colors.black}>七天内可修改三次简介</Text>
      <CustomTextArea
        style={{ marginVertical: 5 }}
        maxCharLimit={maxCharLimit}
        value={description}
        placeholderTextColor="black"
        placeholder={'请输入简介'}
        onChangeText={setDescription}
      />
    </View>
  )
}

export default EditDescriptionScreen
