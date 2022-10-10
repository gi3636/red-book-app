import React, { useEffect } from 'react'
import { Dimensions, ImageBackground, StyleSheet, Text } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { HStack, ScrollView, View } from 'native-base'
import ImageSwiper from './Component/ImageSwiper'
import colors from '../../styles/colors'
import { Button } from '@rneui/base'
import { Entypo } from '@expo/vector-icons'
import { convertTime } from '../../utils'
import BottomInputBar from './Component/BottomInputBar'
import CommentList from './Component/CommentList'
import DislikeBtn from './Component/DislikeBtn'
import NoteInfo from './Component/NoteInfo'
import Background from '../../components/Background'
import { appEmitter } from '../../utils/app.emitter'
import { commentService } from '../../api'

function NoteScreen(props) {
  const route = useRoute()
  const item: any = route.params
  const [commentList, setCommentList] = React.useState<Array<any>>([])
  const [total, setTotal] = React.useState(0)

  useEffect(() => {
    appEmitter.on(appEmitter.type.addNoteComment, (comment: any) => {
      handleRefreshData()
    })
    handleRefreshData()
  }, [])

  const handleRefreshData = () => {
    commentService.list({ noteId: item.id }).then((res) => {
      setCommentList(res.data.list)
      let commentTotal = +res.data.total
      res.data.list.map((comment: any) => {
        commentTotal += comment.children.length
      })
      setTotal(+commentTotal)
    })
  }

  return (
    //<LinearGradient colors={[colors.primary, colors.secondary]} style={{ flex: 1 }}>
    <Background>
      <ScrollView style={styles.container}>
        <ImageSwiper item={item} />
        <NoteInfo item={item} />
        <CommentList item={item} commentList={commentList} total={total} />
      </ScrollView>
      <BottomInputBar item={item} total={total} />
    </Background>
    //</LinearGradient>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 300,
    marginBottom: 65
  }
})
export default NoteScreen
