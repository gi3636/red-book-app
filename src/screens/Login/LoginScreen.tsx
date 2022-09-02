/** @format */

import { ActivityIndicator, ImageBackground, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Center, Image } from 'native-base'
import Form from '../../components/Form'
import { fields } from './form'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../styles/colors'
import Layout from '../../constants/Layout'
import BgBumble from '../../assets/images/bumble-bg.svg'
import Logo from '../../assets/images/logo2.svg'
import { Button } from '@rneui/base'
import { login } from '../../api/auth'
import { saveStorageToken, saveStorageUser } from '../../utils/storage'

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [show, setShow] = React.useState(false)
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data) => {
    setLoading(true)
    let res = await login(data)

    if (res.code === 200 && res.data) {
      saveStorageToken(res.data.token)
      saveStorageUser(res.data)
    }

    setLoading(false)
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={[colors.primary, colors.secondary]}
        style={styles.background}
      />
      <View style={{ width: '100%', marginVertical: 20 }}>
        <Center>
          <Logo />
        </Center>
      </View>
      <BgBumble style={{ position: 'absolute', top: 0 }} />
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
          loadingStyle={{
            borderColor: 'black'
          }}
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
  )
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: Layout.window.height
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  }
})
