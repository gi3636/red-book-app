import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Controller, useForm } from 'react-hook-form'

interface FormProps {
  fields: Array<any>
  onSubmit: Function
  form: any
}

function Form({ fields, onSubmit, form }: FormProps) {
  const {
    control,
    formState: { errors }
  } = form

  const renderSubForm = () => {
    return fields.map((item: any, index) => {
      if (item.show && !item.show()) {
        return ''
      }
      return (
        <>
          <Controller key={item.name} control={control} name={item.name} {...item.props} />
          {errors[item.name] && <Text key={Math.random()} style={styles.errorText}>{`请输入${item.label}`}</Text>}
        </>
      )
    })
  }

  return <View style={{ width: '100%' }}>{renderSubForm()}</View>
}

const styles = StyleSheet.create({
  errorText: {
    marginTop: 3,
    color: 'red'
  }
})

export default Form
