import React from 'react'
import { Input, View } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import colors from '../../../styles/colors'

function CustomSearchHeader(props) {
  const onSearch = () => {
    console.log('search')
  }
  return (
    <View w={'100%'} backgroundColor={colors.white} borderRadius={50} marginLeft={-10}>
      <Input
        _focus={{ backgroundColor: colors.white }}
        style={{ marginHorizontal: 10, backgroundColor: colors.white, height: 38 }}
        variant="rounded"
        placeholder="想要搜索什么呢？"
        rightElement={
          <AntDesign
            name="search1"
            size={24}
            color={colors.placeholder}
            style={{ marginRight: 10 }}
            onPress={onSearch}
          />
        }
      />
    </View>
  )
}

export default CustomSearchHeader
