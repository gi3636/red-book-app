import * as React from 'react'
/**
 * ? Local Imports
 */
import { StyleProp, StyleSheet, Text, TextInput, TextInputProps, TextStyle, ViewStyle } from 'react-native'
import { View } from 'native-base'
import colors from '../styles/colors'
type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>

export interface IRNTextAreaProps extends TextInputProps {
  inputRef?: any
  style?: CustomStyleProp
  textInputStyle?: CustomTextStyleProp
  maxCharTextStyle?: CustomTextStyleProp
  defaultCharCount?: number
  maxCharLimit?: number
  charCountColor?: string
  exceedCharCountColor?: string
  value?: string
  onChangeText: (text: string) => void
}

const CustomTextArea: React.FC<IRNTextAreaProps> = ({
  value,
  style,
  textInputStyle,
  inputRef,
  maxCharLimit = 200,
  defaultCharCount = 0,
  charCountColor = '#ccc',
  exceedCharCountColor = colors.error,
  onChangeText,
  maxCharTextStyle,
  ...rest
}) => {
  const [charCount, setCharCount] = React.useState(value?.length || 0)
  const handleChangeText = (text: string) => {
    setCharCount(text.length)
    if (onChangeText) onChangeText(text)
  }

  const renderCharCount = () => {
    if (!maxCharLimit) return null

    return (
      <Text
        ref={inputRef}
        style={[
          _charCountStyle(charCount > maxCharLimit ? exceedCharCountColor : charCountColor),
          maxCharTextStyle
        ]}>{`${charCount}/${maxCharLimit}`}</Text>
    )
  }

  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        multiline
        {...rest}
        style={[styles.textInputStyle, textInputStyle]}
        onChangeText={handleChangeText}
      />
      {renderCharCount()}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: '100%',
    height: 200,
    backgroundColor: '#fff'
  },
  textInputStyle: {
    margin: 16,
    backgroundColor: 'transparent'
  }
})

const _charCountStyle = (charCountColor: string): TextStyle => ({
  bottom: 8,
  right: 16,
  fontSize: 14,
  position: 'absolute',
  color: charCountColor
})

export default CustomTextArea
