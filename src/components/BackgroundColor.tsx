import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '@/styles/colors'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function BackgroundColor({ children }) {
  return (
    <LinearGradient
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={[colors.primary, colors.secondary]}>
      <SafeAreaView>{children}</SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({})
