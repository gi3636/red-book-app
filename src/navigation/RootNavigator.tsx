/*
 * @Author: gi3636 fenggi123@gmail.com
 * @Date: 2022-10-07 21:15:49
 * @LastEditors: gi3636 fenggi123@gmail.com
 * @LastEditTime: 2022-11-15 22:56:05
 * @FilePath: \red-book-app\src\navigation\RootNavigator.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import NotFoundScreen from '../screens/NotFoundScreen'
import ModalScreen from '../screens/ModalScreen'
import * as React from 'react'
import { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabNavigator from './BottomTabNavigator'
import LoginScreen from '../screens/Login/LoginScreen'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import NoteScreen from '../screens/Note/NoteScreen'
import CustomNoteHeader from '../components/CustomNoteHeader'
import colors from '../styles/colors'
import { AntDesign, Feather } from '@expo/vector-icons'
import SearchScreen from '../screens/Search/SearchScreen'
import CustomSearchHeader from '../screens/Search/Component/CustomSearchHeader'
import MessageScreen from '@/screens/Message/MessageScreen'
import CustomMessageHeader from '@/screens/Message/component/CustomMessageHeader'

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
    <Stack.Navigator initialRouteName={'Login'}>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Group
        screenOptions={{
          animation: 'slide_from_right'
        }}>
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{
            headerShown: true,
            headerTitle: () => <CustomNoteHeader />,
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerRight: () => {
              return <AntDesign name="sharealt" size={22} color="white" />
            },
            headerShadowVisible: true,
            headerTintColor: colors.white,
            headerLargeTitleStyle: {
              color: colors.white
            }
          }}
        />
        <Stack.Screen
          name="Message"
          component={MessageScreen}
          options={{
            headerShown: true,
            headerTitle: () => <CustomMessageHeader />,
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerRight: () => {
              return <Feather name="menu" size={22} color="white" />
            },
            headerShadowVisible: true,
            headerTintColor: colors.white,
            headerLargeTitleStyle: {
              color: colors.white
            }
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            headerShown: true,
            headerTitle: () => <CustomSearchHeader />,
            headerStyle: {
              backgroundColor: colors.primary
            },
            // headerRight: () => {
            //   return <AntDesign name="sharealt" size={22} color="white" />
            // },
            headerShadowVisible: true,
            headerTintColor: colors.white,
            headerLargeTitleStyle: {
              color: colors.white
            }
          }}
        />
      </Stack.Group>

      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  )
}
