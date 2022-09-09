import EditScreen from '../screens/Edit/EditScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import SettingScreen from '../screens/Setting/SettingScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from '../styles/colors'
import EditDataScreen from '../screens/Edit/EditDataScreen'

const Stack = createNativeStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group
        screenOptions={{
          headerShown: false,
          animation: 'simple_push'
        }}>
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          headerShown: true,
          animation: 'simple_push'
        }}>
        <Stack.Screen name="Setting" component={SettingScreen} />
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            title: '编辑',
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerShadowVisible: true,
            headerTintColor: colors.white,
            headerTitleAlign: 'center',
            headerLargeTitleStyle: {
              color: colors.white
            }
          }}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          animation: 'slide_from_bottom'
        }}>
        <Stack.Screen
          name="EditData"
          component={EditDataScreen}
          options={{
            title: '编辑资料',
            headerStyle: {
              backgroundColor: colors.primary
            },
            headerShadowVisible: true,
            headerTintColor: colors.white,
            headerTitleAlign: 'center',
            headerLargeTitleStyle: {
              color: colors.white
            }
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ProfileNavigator
