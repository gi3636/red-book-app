import EditScreen from '../screens/Edit/EditScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import SettingScreen from '../screens/Setting/SettingScreen'
import SettingIcon from '../assets/images/setting.svg'
import EditIcon from '../assets/images/edit.svg'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from '../styles/colors'
import { Feather } from '@expo/vector-icons'
import { TransitionPresets } from '@react-navigation/stack'

const Stack = createNativeStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
