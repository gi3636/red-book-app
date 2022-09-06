import EditScreen from '../screens/Edit/EditScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import SettingScreen from '../screens/Setting/SettingScreen'
import SettingIcon from '../assets/images/setting.svg'
import EditIcon from '../assets/images/edit.svg'
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from '../styles/colors'
import { Feather } from '@expo/vector-icons'

const Stack = createNativeStackNavigator()
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: colors.primary
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            //fontWeight: 'bold'
          },
          headerRight: () => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
              {/*<Feather name="edit" size={24} color="white" />*/}
              <EditIcon
                onPress={() => {
                  console.log('编辑')
                }}
              />
              <SettingIcon
                style={{ margin: 15, width: 10, height: 10 }}
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
