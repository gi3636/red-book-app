import { MaterialTopTabBar } from '@react-navigation/material-top-tabs'
import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Animated, SafeAreaView } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../styles/colors'
import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

function CustomTabBar(props) {
  const navigation = useNavigation()

  return (
    <View
      style={{
        position: 'relative'
      }}>
      <MaterialTopTabBar {...props} />
      <View
        style={{
          position: 'absolute',
          top: 44,
          right: 20,
          zIndex: 2
        }}>
        <AntDesign
          name="search1"
          size={25}
          color={colors.white_smoke}
          onPress={() => {
            navigation.navigate('Search')
          }}
        />
      </View>
    </View>
  )
}

export default CustomTabBar
