import { MaterialTopTabBar } from '@react-navigation/material-top-tabs'
import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Animated, SafeAreaView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../styles/colors'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { ImageBackground, Platform } from 'react-native'
function CustomTabBar(props) {
  const navigation = useNavigation()

  return (
    <>
      <MaterialTopTabBar {...props} />
      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'ios' ? 50 : 40,
          right: 20,
          zIndex: 2
        }}>
        <TouchableOpacity>
          <AntDesign
            name="search1"
            size={25}
            color={colors.white_smoke}
            onPress={() => {
              navigation.navigate('Search')
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default CustomTabBar
