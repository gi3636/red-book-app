import colors from '../../styles/colors'
import React, { useState } from 'react'
import { Spinner, Text, View } from 'native-base'
import { Button, Image } from '@rneui/base'
import { Alert, Dimensions, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import CustomImagePicker from '../../components/CustomImagePicker'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomInput from '../../components/CustomInput'
import CustomTextArea from '../../components/CustomTextArea'
import { jointString, unique } from '../../utils'
import ConfirmModal from '../../components/ConfirmModal'
import CustomLoading from '../../components/CustomLoading'
import { uploadFile, uploadFiles } from '../../utils/file'
import { noteService } from '../../api'
import CustomSwitch from '../../components/CustomSwitch'

const screenHeight = Dimensions.get('window').height
export default function UploadScreen() {
  const [selectedImage, setSelectedImage] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [pickImage, setPickImage] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPublic, setIsPublic] = useState(true)
  const onSuccess = (data: any) => {
    let newData: any = unique([...selectedImage, ...data], 'id')
    if (newData.length >= 8) {
      Alert.alert('最多只能上传8张图片')
      return
    }
    setSelectedImage(newData)
    setPickImage(false)
  }

  const openImagePicker = () => {
    if (selectedImage.length >= 8) {
      Alert.alert('最多只能上传8张图片')
      return
    }
    setPickImage(true)
  }
  const deleteSelectImage = (item: any) => {
    let temp = selectedImage.filter((i: any) => i.id !== item.id)
    setSelectedImage(temp)
  }

  const clearData = () => {
    setSelectedImage([])
    setTitle('')
    setContent('')
  }

  const publishNote = async () => {
    if (selectedImage.length < 0) {
      Alert.alert('请至少上传一张图片')
      return
    }
    if (title === '' || content === '') {
      Alert.alert('请填写标题和内容')
      return
    }
    setIsModalOpen(false)
    setLoading(true)
    try {
      let res = await uploadFiles(selectedImage)
      if (res.code === 200) {
        let images = jointString(res.data.fileUrl)
        let data = {
          content,
          title,
          isPublic: isPublic ? 1 : 0,
          images
        }
        let result = await noteService.add(data)
        if (result.code === 200) {
          clearData()
          Alert.alert('发布成功')
        }
      }
    } catch (e) {
      Alert.alert('发布失败')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {pickImage ? (
        <CustomImagePicker onSuccess={onSuccess} onCancel={setPickImage.bind(null, false)} />
      ) : (
        <SafeAreaView style={styles.container}>
          <ImageBackground
            style={{ flex: 1, backgroundColor: colors.primary }}
            source={require('../../assets/images/bumble-bg.png')}
            resizeMode="contain">
            <View style={styles.header}>
              <Text style={styles.headerText}>添加笔记</Text>
              <AntDesign name="exclamationcircleo" size={20} color="white" style={{ marginRight: 10 }} />
            </View>
            <ScrollView>
              <View padding={3}>
                <View marginBottom={5}>
                  <Text style={styles.title}>填写标题</Text>
                  <CustomInput
                    value={title}
                    onChangeText={setTitle}
                    label="标题"
                    containerStyle={{ paddingHorizontal: 2 }}
                  />
                </View>
                <View marginBottom={5}>
                  <Text style={styles.title}>填写内容</Text>
                  <CustomTextArea
                    value={content}
                    onChangeText={setContent}
                    style={{ height: 120 }}
                    placeholder="说说此刻心情"
                  />
                </View>
                <View marginBottom={5}>
                  <CustomSwitch title="是否公开" setChecked={setIsPublic} checked={isPublic} />
                </View>
                <View marginTop={-2} marginBottom={5}>
                  <Text style={styles.title}>添加图片</Text>
                  <View style={styles.imagesList}>
                    {selectedImage.map((item: any, index) => (
                      <Image
                        key={item.id}
                        onPress={deleteSelectImage.bind(null, item)}
                        resizeMethod="scale"
                        style={styles.image}
                        source={{
                          // uri: `https://avatars1.githubusercontent.com/u/${parseInt(String(Math.random() * 1000))}`
                          uri: item.uri
                        }}
                      />
                    ))}
                    <Button
                      onPress={openImagePicker}
                      buttonStyle={styles.pickImageBtn}
                      icon={{
                        name: 'plus',
                        type: 'antdesign',
                        size: 40,
                        color: colors.white
                      }}
                      containerStyle={{}}
                    />
                  </View>
                </View>

                <Button
                  onPress={() => setIsModalOpen(true)}
                  buttonStyle={styles.uploadBtn}
                  titleStyle={{ fontWeight: 'bold', fontSize: 16, color: colors.white }}>
                  发布笔记
                </Button>
              </View>
            </ScrollView>
          </ImageBackground>
        </SafeAreaView>
      )}
      <ConfirmModal
        isOpen={isModalOpen}
        content="是否确认发布？"
        onClose={setIsModalOpen.bind(null, false)}
        onConfirm={publishNote}
        title="发布笔记"
      />
      <CustomLoading loading={loading} title="发布笔记中" />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: colors.primary,
    height: screenHeight - 20
  },
  header: {
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold'
  },
  imagesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: -5
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginTop: 10,
    marginRight: 10
  },
  pickImageBtn: {
    backgroundColor: colors.placeholder,
    borderColor: 'transparent',
    borderWidth: 0,
    height: 80,
    width: 80,
    borderRadius: 10,
    marginTop: 10
  },
  title: {
    marginBottom: 3,
    color: colors.white,
    fontSize: 16
  },
  uploadBtn: {
    overflow: 'hidden',
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: colors.danger,
    color: colors.black
  }
})
