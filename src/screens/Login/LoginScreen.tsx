/** @format */

import { ImageBackground, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Center, useToast } from 'native-base'
import Form from '../../components/Form'
import { fields } from './form'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../styles/colors'
import Logo from '../../assets/images/logo2.svg'
import { Button } from '@rneui/base'

import { saveStorageToken, saveStorageUser } from '../../utils/storage'
import { authService } from '../../api'
import { updateUser } from '../../store/user/slice'
import { useDispatch } from 'react-redux'

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [show, setShow] = React.useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
  const form = useForm({
    defaultValues: {
      username: 'franky',
      password: '123123',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      let res = isLogin ? await authService.login(data) : await authService.register(data)
      if (res.code === 200) {
        if (isLogin) {
          saveStorageToken(res.data.token)
          dispatch(updateUser(res.data))
          toast.show({ title: '登入成功', placement: 'top' })
          navigation.replace('Root')
        } else {
          form.reset()
          toast.show({ title: '注册成功', placement: 'top' })
          setIsLogin(true)
        }
      } else {
        toast.show({ title: res.message })
      }
    } catch (e) {
      console.log('错误', e)
    }
    setLoading(false)
  }
  return (
    <LinearGradient colors={[colors.primary, colors.secondary]} style={styles.background}>
      <ImageBackground style={{ flex: 1 }} source={require('../../assets/images/bumble-bg.png')} resizeMode="contain">
        <View style={styles.container}>
          <View style={{ width: '100%', marginVertical: 50 }}>
            <Center>
              <Logo />
            </Center>
          </View>
          <Form fields={fields(show, setShow, isLogin)} onSubmit={onSubmit} form={form} />
          {isLogin && (
            <View style={{ alignSelf: 'flex-end' }}>
              <Button
                type="clear"
                onPress={setIsLogin.bind(null, false)}
                titleStyle={{
                  color: 'white'
                }}
                containerStyle={{
                  marginVertical: 2
                }}>
                还未注册账号？
              </Button>
            </View>
          )}
          <Button
            loading={loading}
            loadingProps={{
              size: 'small',
              color: colors.primary
            }}
            buttonStyle={{
              backgroundColor: 'white',
              borderRadius: 5
            }}
            titleStyle={{ fontWeight: 'bold', fontSize: 16, color: colors.black }}
            containerStyle={{
              marginHorizontal: 50,
              height: 50,
              width: '80%',
              marginVertical: 40
            }}
            onPress={form.handleSubmit(onSubmit)}>
            {isLogin ? '登录' : '注册'}
          </Button>
          {!isLogin && (
            <Button
              type="clear"
              titleStyle={{
                color: 'white'
              }}
              containerStyle={{
                marginVertical: 5
              }}
              onPress={setIsLogin.bind(null, true)}>
              返回
            </Button>
          )}
        </View>
      </ImageBackground>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%'
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  }
})
