import React, { useEffect } from 'react'
import { Center, HStack, View, Text } from 'native-base'
import { StyleSheet } from 'react-native'
import colors from '../../../styles/colors'
import CommentItem from '../../../components/Comment/CommentItem'
import { commentService } from '../../../api'
import { appEmitter } from '../../../utils/app.emitter'

function CommentList({ item }) {
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
      console.log(res)
      setCommentList(res.data.list)
      setTotal(+res.data.total)
    })
  }

  const renderCommentList = () => {
    return commentList.map((comment: any) => {
      if (comment.children.length > 0) {
        return (
          <CommentItem key={comment.id} item={comment}>
            {comment.children.map((child) => {
              return <CommentItem key={child.id} item={child} />
            })}
          </CommentItem>
        )
      }
      return <CommentItem key={comment.id} item={comment} />
    })
  }

  return (
    <View style={styles.commentContainer}>
      {total === 0 ? (
        <Center>
          <Text color={colors.white}>-暂无评论-</Text>
        </Center>
      ) : (
        <>
          <Text style={{ color: colors.white }}>共 {total} 条评论</Text>
          <View style={styles.commentList} w="100%" />
          {renderCommentList()}
        </>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  commentContainer: {
    padding: 10,
    width: '100%'
  },
  commentList: {
    paddingTop: 10
  }
})
export default CommentList
