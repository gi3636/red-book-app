import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import useCachedResources from './src/hooks/useCachedResources'
import useColorScheme from './src/hooks/useColorScheme'
import Navigation from './src/navigation'
import { NativeBaseProvider } from 'native-base'
import { customTheme } from './src/styles/theme'
import 'react-native-gesture-handler'
export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  }
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={customTheme}>
        <Navigation colorScheme={colorScheme} />
      </NativeBaseProvider>
      <StatusBar />
    </SafeAreaProvider>
  )
}
