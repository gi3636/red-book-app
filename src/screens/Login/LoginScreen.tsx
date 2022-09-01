/** @format */

import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Center, Image } from 'native-base'
import Form from '../../components/Form'
import { fields } from './form'

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const form = useForm({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: ''
    }
  })
  const [show, setShow] = React.useState(false)

  const onSubmit = (data) => {
    setLoading(true)
    console.log('data', data)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }
  return (
    <View style={styles.container}>
      <View style={{ width: '100%' }}>
        <Center>
          <Image
            resizeMode="contain"
            size={150}
            style={{ width: '60%' }}
            source={{
              uri: 'https://ci.xiaohongshu.com/5c6dec9a-8e4b-41f0-960b-0ae9493ea700'
            }}
            alt="Alternate Text"
          />
        </Center>
      </View>
      <Form fields={fields(show, setShow, isLogin)} onSubmit={onSubmit} form={form} />
      {isLogin && (
        <View style={{ alignSelf: 'flex-end' }}>
          <Button variant="ghost" onPress={setIsLogin.bind(null, false)}>
            还未注册？
          </Button>
        </View>
      )}
      <Button
        isLoading={loading}
        isLoadingText={isLogin ? '登录中' : '注册中'}
        style={{ marginTop: isLogin ? 10 : 20, width: '50%' }}
        onPress={form.handleSubmit(onSubmit)}>
        {isLogin ? '登录' : '注册'}
      </Button>
      {!isLogin && (
        <Button style={{ marginTop: 15 }} variant="ghost" onPress={setIsLogin.bind(null, true)}>
          返回
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100,
    backgroundColor: 'white'
  }
})
