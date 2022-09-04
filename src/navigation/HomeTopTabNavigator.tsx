import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import * as React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CustomTabBar from '../components/CustomTabBar'
import RecommendScreen from '../screens/Recommed/RecommendScreen'
import NearbyScreen from '../screens/Nearby/NearbyScreen'
import FollowScreen from '../screens/Follow/FollowScreen'
import colors from '../styles/colors'

const Tab = createMaterialTopTabNavigator()

export default function HomeTopTabNavigator() {
  const insets = useSafeAreaInsets()
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.white,
        tabBarLabelStyle: {
          fontSize: 16,
          textTransform: 'uppercase'
        },
        tabBarItemStyle: {
          alignSelf: 'center'
        },
        //指示器的样式
        tabBarIndicatorStyle: {
          // height:0, height 为0不显示
          backgroundColor: colors.white,
          borderRadius: 50,
          width: '15%',
          left: '9%',
          top: '90%'
        },
        tabBarIndicatorContainerStyle: {
          backgroundColor: 'transparent'
        },
        tabBarStyle: {
          position: 'absolute',
          paddingTop: insets.top,
          alignSelf: 'center',
          width: '60%',
          backgroundColor: 'transparent',
          elevation: 0, // shadow on Android
          shadowOpacity: 0, // shadow on iOS,
          shadowRadius: 0, // shadow blur on iOS
          zIndex: 1
        }
      }}>
      <Tab.Screen name="推荐" component={RecommendScreen} />
      <Tab.Screen name="附近" component={NearbyScreen} />
      <Tab.Screen name="关注" component={FollowScreen} />
    </Tab.Navigator>
  )
}
