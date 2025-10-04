import { icons } from '@/constants/icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

const profile = () => {
  return (
    <View className="bg-primary flex-1 px-10">
      <View className='flex justify-center items-center flex-1 flex-col gap-5'>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <Text className='text-gray-500 text-base' >Profile</Text>
      </View>
    </View>
  )
}

export default profile