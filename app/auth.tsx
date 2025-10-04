import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { icons } from '@/constants/icons'

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev)
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="bg-primary flex-1"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-8 py-12">
          {/* Logo */}
          <View className="items-center mb-10">
            <Image
              source={icons.logo}
              resizeMode="contain"
              className="w-20 h-20"
            />
          </View>

          {/* Heading */}
          <Text className="text-3xl font-bold text-white text-center mb-8">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Text>

          {/* Form */}
          <View className="space-y-4">
            {/* Email Input */}
            <View>
              <Text className="text-white font-medium mb-1">Email</Text>
              <TextInput
                aria-label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="example@gmail.com"
                className="rounded-md px-4 py-3 text-base text-white bg-white/10 border border-white/30"
                placeholderTextColor="#E5E7EB"
              />
            </View>

            {/* Password Input */}
            <View>
              <Text className="text-white font-medium mb-1">Password</Text>
              <TextInput
                aria-label="Password"
                autoCapitalize="none"
                secureTextEntry
                placeholder="Enter your password"
                className="rounded-md px-4 py-3 text-base text-white bg-white/10 border border-white/30"
                placeholderTextColor="#E5E7EB"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity className="bg-white rounded-md py-3 mt-4">
              <Text className="text-primary text-center text-base font-semibold">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Toggle Auth Mode */}
            <TouchableOpacity className="mt-4" onPress={handleSwitchMode}>
              <Text className="text-white text-center font-medium">
                {isSignUp
                  ? 'Already have an account? '
                  : "Don't have an account? "}
                <Text className="underline">
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default AuthScreen
