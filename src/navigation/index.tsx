/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 * @format
 */

import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { ColorSchemeName } from 'react-native'

import RootNavigator from './RootNavigator'
import { getStorageUser } from '../utils/storage'
import { useDispatch } from 'react-redux'
import { updateUser } from '../store/user/slice'
import CustomLoading from '../components/CustomLoading'
import { appEmitter } from '../utils/app.emitter'

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const dispatch = useDispatch()
  const [loadData, setLoadData] = useState(true)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    appEmitter.on(appEmitter.type.loading, () => {
      setLoading(!loading)
    })

    getStorageUser().then((res: any) => {
      dispatch(updateUser(res))
      setLoadData(false)
    })
  }, [])

  return (
    <>
      {!loadData && (
        <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNavigator />
          <CustomLoading loading={loading} />
        </NavigationContainer>
      )}
    </>
  )
}
