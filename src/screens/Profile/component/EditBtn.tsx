import React from 'react'
import { View, Text } from 'native-base'
import { Button } from '@rneui/base'
import colors from '../../../styles/colors'
import { StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import { appEmitter } from '../../../utils/app.emitter'
import { FontAwesome } from '@expo/vector-icons'
function EditBtn({ navigation }) {
  return (
    <View style={styles.editBtnContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.push('Edit')
        }}
        activeOpacity={0.5}>
        <FontAwesome name="edit" size={25} color={colors.medium} />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  editBtnContainer: {
    position: 'absolute',
    top: 10,
    right: 15
  }
})

export default EditBtn
