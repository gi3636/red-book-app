import React from 'react'
import { AlertDialog } from 'native-base'
import { Button } from '@rneui/base'

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
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        {title && <AlertDialog.Header>{title}</AlertDialog.Header>}
        {content && <AlertDialog.Body>{content}</AlertDialog.Body>}
        <AlertDialog.Footer>
          <Button onPress={onClose}>{cancelText || '取消'}</Button>
          <Button onPress={onConfirm}>{confirmText || '确认'}</Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

export default ConfirmModal
