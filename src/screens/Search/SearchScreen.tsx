import React from 'react'
import { Button, HStack, Text, View } from 'native-base'
import { StyleSheet } from 'react-native'
import colors from '../../styles/colors'
import { Ionicons } from '@expo/vector-icons'

function SearchScreen(props) {
  return (
    <View style={styles.container}>
      <View>
        <HStack justifyContent={'space-between'}>
          <Text>历史记录</Text>
          <Ionicons name="trash-outline" size={20} color={colors.main_font} />
        </HStack>
        <HStack alignItems="flex-start" space={2} mt={2}>
          <Button
            style={styles.historyBtn}
            _text={{ color: colors.black, fontSize: 12 }}
            onPress={() => console.log('hello world')}>
            #吃饱没事做
          </Button>
          <Button
            style={styles.historyBtn}
            _text={{ color: colors.black, fontSize: 12 }}
            onPress={() => console.log('hello world')}>
            #吃饱没事做
          </Button>
        </HStack>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.white_smoke
  },
  historyBtn: {
    backgroundColor: colors.white,
    color: colors.black,
    paddingVertical: 0
  }
})
export default SearchScreen
