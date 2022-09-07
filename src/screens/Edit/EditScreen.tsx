import React from 'react'
import { Button } from '@rneui/base'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function EditScreen({ navigation }) {
  return (
    <SafeAreaView>
      <View>
        <Button
          onPress={() => {
            navigation.goBack()
          }}>
          返回
        </Button>
        <Text>编辑</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
