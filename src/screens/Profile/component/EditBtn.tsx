import React from 'react'
import { View } from 'native-base'
import { Button } from '@rneui/base'
import colors from '../../../styles/colors'
import { StyleSheet } from 'react-native'
import { appEmitter } from '../../../utils/app.emitter'
function EditBtn({ navigation }) {
  return (
    <View style={styles.editBtnContainer}>
      <Button
        icon={{
          name: 'edit',
          type: 'font-awesome',
          size: 25,
          color: colors.medium
        }}
        style={styles.editBtn}
        titleStyle={{
          color: colors.main_font
        }}
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: 5
        }}
        onPress={() => {
          navigation.push('Edit')
        }}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  editBtnContainer: {
    position: 'absolute',
    top: 10,
    right: 15
  },
  editBtn: {
    width: '20%',
    borderRadius: 20
  }
})

export default EditBtn
