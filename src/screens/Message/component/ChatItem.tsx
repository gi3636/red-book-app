import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from '@rneui/base'
import colors from '@/styles/colors'
import RightArrowIcon from '../../../assets/images/right-arrow.svg'
import HorizontalLine from '@/components/HorizontalLine'
import navigation from '@/navigation'
import TouchableScale from 'react-native-touchable-scale'
export default function ChatItem() {
  return (
    <>
      <TouchableScale friction={100} tension={100} activeScale={0.98} onPress={() => {}}>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Avatar
              size={50}
              rounded
              source={{
                uri: 'https://randomuser.me/api/portraits/women/57.jpg'
              }}
              containerStyle={{
                backgroundColor: 'grey'
              }}
            />
            <View style={styles.chatBody}>
              <View style={styles.box}>
                <Text style={styles.name}>发送机</Text>
                <Text style={styles.time}>3:42pm</Text>
              </View>
              <View>
                <Text style={styles.chatContent}>我们来聊天吧</Text>
              </View>
            </View>
          </View>
          <RightArrowIcon style={{ width: 3, height: 3 }} />
        </View>
      </TouchableScale>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.2,
    borderBottomColor: colors.placeholder
  },
  chatBody: {
    flexDirection: 'column',
    marginLeft: 12
  },
  box: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 16
  },
  time: {
    marginLeft: 15,
    fontSize: 12,
    color: 'gray'
  },
  chatContent: {
    color: colors.main_font
  }
})
