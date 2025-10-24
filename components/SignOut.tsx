import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/services/auth-context'

const SignOut = () => {
  const { signOut } = useAuth();

  return (
    <View className="items-center mt-8">
      <TouchableOpacity
        onPress={signOut}
        activeOpacity={0.7}
        className="bg-purple-300 px-8 py-3 rounded-full"
      >
        <Text className="text-white font-semibold text-lg">Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignOut
