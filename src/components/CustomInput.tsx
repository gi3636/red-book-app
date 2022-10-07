import React from 'react'
import { Icon, Input, View } from 'native-base'
import { FontAwesome } from '@expo/vector-icons'
import { StyleProp, ViewStyle } from 'react-native'
import { IInputProps } from 'native-base/src/components/primitives/Input/types'

interface CustomInputProps extends IInputProps {
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  style?: any
  label: string
  containerStyle?: StyleProp<ViewStyle> | undefined
}

function CustomInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
  label,
  containerStyle,
  ...props
}: CustomInputProps) {
  return (
    <View style={containerStyle} key={label}>
      <Input
        size={22}
        _light={{
          color: 'black',
          backgroundColor: 'white'
        }}
        variant="filled"
        placeholder={placeholder || `请输入${label}`}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        style={{ marginRight: 10, height: 43, ...style }}
        {...props}
      />
    </View>
  )
}

export default CustomInput
