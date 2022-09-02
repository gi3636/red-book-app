import { Icon, Input, Pressable } from 'native-base'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import { View } from 'react-native'
import React from 'react'

export const fields = (show, setShow, isLogin) => [
  {
    label: '账号',
    name: 'username',
    show: () => {
      return true
    },
    props: {
      rules: {
        required: true
      },
      render: ({ field: { onChange, onBlur, value } }) => (
        <Input
          _light={{
            color: 'black',
            backgroundColor: 'white'
          }}
          InputLeftElement={<Icon as={<FontAwesome name="user" />} size={5} ml="3" color="muted.400" />}
          variant="filled"
          placeholder="请输入账号"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
        />
      )
    }
  },
  {
    label: '密码',
    name: 'password',
    props: {
      rules: {
        required: true
      },
      render: ({ field: { onChange, onBlur, value } }) => (
        <View style={{ marginTop: 12 }}>
          <Input
            _light={{
              color: 'black',
              backgroundColor: 'white'
            }}
            InputLeftElement={<Icon as={<FontAwesome name="unlock-alt" />} size={5} ml="3" color="muted.400" />}
            variant="filled"
            placeholder="请输入密码"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            type={show ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={setShow.bind(null, !show)}>
                <Icon
                  as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
        </View>
      )
    }
  },
  {
    label: '确认密码',
    name: 'confirmPassword',
    show: () => {
      return !isLogin
    },
    props: {
      rules: {
        required: true
      },
      render: ({ field: { onChange, onBlur, value } }) => (
        <View style={{ marginTop: 12 }}>
          <Input
            _light={{
              color: 'black',
              backgroundColor: 'white'
            }}
            InputLeftElement={<Icon as={<FontAwesome name="unlock-alt" />} size={5} ml="3" color="muted.400" />}
            variant="filled"
            placeholder="请输入密码"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            type={show ? 'text' : 'password'}
            InputRightElement={
              <Pressable onPress={setShow.bind(null, !show)}>
                <Icon
                  as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                  size={5}
                  mr="2"
                  color="muted.400"
                />
              </Pressable>
            }
          />
        </View>
      )
    }
  }
]
