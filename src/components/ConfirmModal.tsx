import React from 'react'
import { AlertDialog, View, Text } from 'native-base'
import { Button } from '@rneui/base'
import { StyleSheet } from 'react-native'
import colors from '../styles/colors'

type modalProps = {
  isOpen: boolean
  onClose: () => any
  onConfirm: () => any
  title: string
  content?: string
  cancelText?: string
  confirmText?: string
}
function ConfirmModal({ isOpen, onConfirm, onClose, title, cancelText, confirmText, content }: modalProps) {
  const cancelRef = React.useRef(null)
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialog.Content style={styles.container}>
        <AlertDialog.CloseButton />

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.content}>{content}</Text>
        </View>
        <View style={styles.footer}>
          <Button
            buttonStyle={styles.cancelBtn}
            titleStyle={{ color: colors.placeholder, fontWeight: 'bold' }}
            onPress={onClose}>
            {cancelText || '取消'}
          </Button>
          <Button
            buttonStyle={styles.confirmBtn}
            titleStyle={{ color: colors.white, fontWeight: 'bold' }}
            onPress={onConfirm}>
            {confirmText || '确认'}
          </Button>
        </View>
      </AlertDialog.Content>
    </AlertDialog>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  titleContainer: {},
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold'
  },
  contentContainer: {},
  content: {
    color: colors.main_font,
    padding: 10,
    fontSize: 18
  },
  footer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0
  },
  confirmBtn: {
    borderRadius: 20,
    paddingHorizontal: 30,
    backgroundColor: colors.danger
  },
  cancelBtn: {
    paddingHorizontal: 30,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: colors.placeholder,
    backgroundColor: 'transparent',
    borderRadius: 20
  }
})

export default ConfirmModal
