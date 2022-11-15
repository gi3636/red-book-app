import { StatusBar } from 'expo-status-bar'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { NativeBaseProvider } from 'native-base'
import { customTheme } from './src/styles/theme'
import 'react-native-gesture-handler'
import store from './src/store'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RootSiblingParent } from 'react-native-root-siblings'
export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  }
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NativeBaseProvider theme={customTheme}>
          <RootSiblingParent>
            <Navigation colorScheme={colorScheme} />
          </RootSiblingParent>
        </NativeBaseProvider>
        <StatusBar />
      </Provider>
    </SafeAreaProvider>
  )
}
