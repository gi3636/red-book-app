import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import useColorScheme from '../hooks/useColorScheme'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import HomeScreen from '../screens/Home/HomeScreen'
import colors from '../styles/colors'
import ProfileNavigator from './ProfileNavigator'
import MessageScreen from '../screens/Message/MessageScreen'
import UploadIcon from '../assets/images/upload-btn.svg'
import TouchableScale from 'react-native-touchable-scale'
import { useNavigation } from '@react-navigation/native'
import UploadScreen from '../screens/Upload/UploadScreen'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { View } from 'native-base'
import { ImageBackground, Platform } from 'react-native'

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  const navigation = useNavigation()
  return (
    <ImageBackground
      style={{ flex: 1, backgroundColor: colors.primary }}
      source={require('../assets/images/bumble-bg.png')}
      resizeMode="contain">
      <BottomTab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.white200,
          headerShown: false,
          tabBarStyle: {
            height: Platform.OS === 'ios' ? 82 : 55,
            paddingTop: 5,
            backgroundColor: 'white',
            position: 'absolute',
            borderWidth: 0
          }
        }}>
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: '首页',
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            tabBarItemStyle: { marginBottom: 5 },
            tabBarIcon: ({ color, size }) => <AntDesign name="home" size={size} color={color} />
          }}
        />
        <BottomTab.Screen
          name="Shop"
          component={HomeScreen}
          options={{
            tabBarLabel: '购物',
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            tabBarItemStyle: { marginBottom: 5 },
            tabBarIcon: ({ color, size }) => (
              <Feather name="shopping-cart" size={size} color={color} style={{ marginRight: 3 }} />
            )
          }}
        />
        <BottomTab.Screen
          name="Upload"
          component={UploadScreen}
          options={{
            headerShown: false,
            tabBarLabel: '',
            tabBarIcon: ({ color, size }) => (
              <TouchableScale
                activeScale={0.95}
                onPress={() => {
                  // @ts-ignore
                  navigation.navigate('Upload')
                }}>
                <UploadIcon style={{ width: '100%', height: '100%', padding: 30 }} />
              </TouchableScale>
            ),
            tabBarItemStyle: { marginBottom: 10 },
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerRight: () => {
              return <AntDesign name="exclamationcircleo" size={20} color="white" style={{ marginRight: 10 }} />
            },
            headerShadowVisible: true,
            headerTitle: '添加笔记',
            headerTintColor: colors.white
          }}
        />
        <BottomTab.Screen
          name="Message"
          component={MessageScreen}
          options={{
            tabBarLabel: '信息',
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            tabBarItemStyle: { marginBottom: 5 },
            tabBarIcon: ({ color, size }) => <AntDesign name="message1" size={23} color={color} />
          }}
        />
        <BottomTab.Screen
          name="ProfileNavigator"
          component={ProfileNavigator}
          options={{
            tabBarLabel: '个人',
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold'
            },
            tabBarItemStyle: { marginBottom: 5 },
            tabBarIcon: ({ color, size }) => <AntDesign name="user" size={size} color={color} />
          }}
        />
      </BottomTab.Navigator>
    </ImageBackground>
  )
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
