import NotFoundScreen from '../screens/NotFoundScreen'
import ModalScreen from '../screens/ModalScreen'
import * as React from 'react'
import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'
import LoginScreen from '../screens/Login/LoginScreen'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  const myself = useSelector((state: any) => state.user)
  const navigation = useNavigation()

  useEffect(() => {
    // @ts-ignore
    navigation.navigate(myself.token ? 'Root' : 'Login')
  }, [myself.token])
  return (
    <Stack.Navigator initialRouteName={'Root'}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
