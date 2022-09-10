import EditScreen, { userPropsList } from '../screens/Edit/EditScreen'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import SettingScreen from '../screens/Setting/SettingScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import colors from '../styles/colors'
import { Button } from '@rneui/base'
import { appEmitter } from '../utils/app.emitter'
import { firstLetterInCapital } from '../utils'

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
          animation: 'slide_from_right'
        }}>
        {userPropsList.map((item) => {
          return (
            <Stack.Screen
              key={item.name}
              name={`Edit${firstLetterInCapital(item.name)}`}
              component={item.component}
              options={{
                title: `编辑${item.title}`,
                headerStyle: {
                  backgroundColor: colors.primary
                },
                headerRight: () => {
                  return (
                    <Button
                      buttonStyle={{
                        backgroundColor: colors.primary,
                        borderRadius: 5
                      }}
                      title="保存"
                      onPress={() => {
                        appEmitter.fire(appEmitter.type.editData)
                      }}
                    />
                  )
                },
                headerShadowVisible: true,
                headerTintColor: colors.white,
                headerTitleAlign: 'center',
                headerLargeTitleStyle: {
                  color: colors.white
                }
              }}
            />
          )
        })}
      </Stack.Group>
    </Stack.Navigator>
  )
}

export default ProfileNavigator
