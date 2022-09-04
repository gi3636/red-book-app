import EditScreen from '../screens/Edit/EditScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import SettingScreen from '../screens/Setting/SettingScreen'
import SettingIcon from '../assets/images/setting.svg'
import EditIcon from '../assets/images/edit.svg'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from '../styles/colors'

const Stack = createNativeStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.primary
            //elevation: 0, // shadow on Android
            //shadowOpacity: 0, // shadow on iOS,
            //shadowRadius: 0 // shadow blur on iOS
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              <EditIcon
                onPress={() => {
                  console.log('编辑')
                }}
              />
              <SettingIcon
                style={{ margin: 15 }}
                onPress={() => {
                  console.log('设定')
                }}
              />
            </View>
          )
        }}
      />
      <Stack.Screen name="Setting" component={SettingScreen} />
      <Stack.Screen name="Edit" component={EditScreen} />
    </Stack.Navigator>
  )
}

export default ProfileNavigator
