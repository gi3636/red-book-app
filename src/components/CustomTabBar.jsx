import { MaterialTopTabBar } from '@react-navigation/material-top-tabs'
import React, { Component } from 'react'
import { TouchableOpacity, View, Text, Animated } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import colors from '../styles/colors'

class CustomTabBar extends Component {
  render() {
    return (
      <View
        style={{
          position: 'relative'
        }}>
        <MaterialTopTabBar {...this.props} />
        {/*<TouchableOpacity style={{ position: 'absolute', right: 0, top: 0 }}>*/}
        {/*  <Ionicons name={'ios-search-outline'} size={24} color={colors.white} />*/}
        {/*</TouchableOpacity>*/}
      </View>
    )
  }
}

export default CustomTabBar
