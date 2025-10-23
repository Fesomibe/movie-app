import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '@/services/auth-context'

const SignOut = () => {
    const {signOut} = useAuth();
  return (
    <View>
      <TouchableOpacity onPress={signOut}>
        <Text>SignOut</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignOut