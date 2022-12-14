/** @format */

import { StyleSheet } from 'react-native'

import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { Button } from '@rneui/themed'
import React from 'react'
export default function TabOneScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/TabOneScreen.tsx" />
      <Button title="Solid" />
      <Button title="Outline" type="outline" />
      <Button title="Clear" type="clear" />
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="warning">Warning</Button>
      <Button color="error">Error</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%'
  }
})
