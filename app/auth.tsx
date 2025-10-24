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
import { useAuth } from '@/services/auth-context'
import { useRouter } from 'expo-router'

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>('')

  const router = useRouter()
  const { signIn, signUp } = useAuth()

  const handleAuth = async () => {
    if (isSignUp && !fullName.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setError(null)

    if (isSignUp) {
      const error = await signUp(email, password, fullName)
      if (error) {
        setError(error)
        return
      }
    } else {
      const error = await signIn(email, password)
      if (error) {
        setError(error)
        return
      }
      router.replace('/')
    }
  }

  const handleSwitchMode = () => {
    setIsSignUp((prev) => !prev)
    setError(null)
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
          <View className="items-center mb-10">
            <Image
              source={icons.logo}
              resizeMode="contain"
              className="w-20 h-20"
            />
          </View>

          <Text className="text-3xl font-bold text-white text-center mb-8">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </Text>

          <View className="space-y-4">

            {isSignUp && (
              <View>
                <Text className="text-white font-medium mb-1">Full Name</Text>
                <TextInput
                  aria-label="Full Name"
                  placeholder="John Doe"
                  className="rounded-md px-4 py-3 text-base text-white bg-white/10 border border-white/30"
                  placeholderTextColor="#E5E7EB"
                  onChangeText={setFullName}
                  value={fullName}
                />
              </View>
            )}

            <View>
              <Text className="text-white font-medium mb-1">Email</Text>
              <TextInput
                aria-label="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="example@gmail.com"
                className="rounded-md px-4 py-3 text-base text-white bg-white/10 border border-white/30"
                placeholderTextColor="#E5E7EB"
                onChangeText={setEmail}
                value={email}
              />
            </View>

            <View>
              <Text className="text-white font-medium mb-1">Password</Text>
              <TextInput
                aria-label="Password"
                autoCapitalize="none"
                secureTextEntry
                placeholder="Enter your password"
                className="rounded-md px-4 py-3 text-base text-white bg-white/10 border border-white/30"
                placeholderTextColor="#E5E7EB"
                onChangeText={setPassword}
                value={password}
              />
            </View>

            {error && <Text className="text-red-700 mt-1">{error}</Text>}

            <TouchableOpacity onPress={handleAuth} className="bg-white rounded-md py-3 mt-4">
              <Text className="text-primary text-center text-base font-semibold">
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>

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
