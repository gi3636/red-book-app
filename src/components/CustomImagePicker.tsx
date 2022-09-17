import React, { useMemo } from 'react'
import { AssetsSelector } from 'expo-images-picker'
import { View } from 'native-base'
import { Alert, StyleSheet } from 'react-native'
import colors from '../styles/colors'
import { MediaType } from 'expo-media-library'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
type ImagePickerProps = {
  onSuccess: Function
  onCancel?: Function
}
function CustomImagePicker({ onSuccess, onCancel }: ImagePickerProps) {
  const navigator = useNavigation()

  const widgetSettings = useMemo(
    () => ({
      getImageMetaData: false,
      initialLoad: 100,
      assetsType: [MediaType.photo],
      minSelection: 0,
      maxSelection: 8,
      portraitCols: 4,
      landscapeCols: 4
    }),
    []
  )
  const widgetErrors = useMemo(
    () => ({
      errorTextColor: colors.main_font,
      errorMessages: {
        hasErrorWithPermissions: "You don't have permission to access the gallery.",
        hasErrorWithLoading: 'There was an error loading the gallery.',
        hasErrorWithResizing: 'There was an error resizing the image.',
        hasNoAssets: 'There are no images in your gallery.'
      }
    }),
    []
  )
  const widgetStyles = useMemo(
    () => ({
      margin: 2,
      bgColor: 'white',
      spinnerColor: 'blue',
      widgetWidth: 99,
      videoIcon: {
        Component: Ionicons,
        iconName: 'ios-videocam',
        color: 'tomato',
        size: 20
      },
      selectedIcon: {
        Component: Ionicons,
        iconName: 'ios-checkmark-circle-outline',
        color: 'white',
        bg: 'rgba(68,67,67,0.5)',
        size: 26
      }
    }),
    []
  )
  const widgetNavigator = useMemo(
    () => ({
      Texts: {
        finish: '完成',
        back: '返回',
        selected: '已选择'
      },
      midTextColor: 'black',
      minSelection: 1,
      buttonTextStyle: {},
      buttonStyle: {},
      onBack: () => {
        onCancel && onCancel()
      },
      onSuccess: (e: any) => onSuccess(e)
    }),
    []
  )
  return (
    <SafeAreaView style={styles.container}>
      <AssetsSelector
        Settings={widgetSettings}
        Errors={widgetErrors}
        Styles={widgetStyles}
        Navigator={widgetNavigator}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1
  }
})

export default React.memo(CustomImagePicker)
