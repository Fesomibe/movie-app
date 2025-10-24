import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { account } from '@/services/appwrite';
import SignOut from '@/components/SignOut';

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await account.get();
        setUser(res);
      } catch (err) {
        console.log('Error fetching user:', err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) setImage(result.assets[0].uri);
  };

  if (loading) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <ActivityIndicator color="#fff" size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 bg-primary justify-center items-center">
        <Text className="text-white text-lg">No user data found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-primary px-6 py-10">
      <View className="items-center mb-10">
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={
              image
                ? { uri: image }
                : { uri: 'https://i.pravatar.cc/150' }
            }
            className="w-28 h-28 rounded-full mb-4 border-2 border-blue-400"
          />
        </TouchableOpacity>

        <Text className="text-white text-xl font-semibold">
          {user.name || 'User'}
        </Text>
        <Text className="text-gray-400 mt-1">{user.email}</Text>
      </View>

      <View className="bg-secondary rounded-2xl p-5 space-y-4 mb-8">
        <View className="flex-row justify-between">
          <Text className="text-gray-300">Joined</Text>
          <Text className="text-white font-medium">
            {new Date(user.$createdAt).toDateString()}
          </Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-300">Status</Text>
          <Text className="text-green-400 font-medium">Active</Text>
        </View>
      </View>

      <View className="items-center mb-10">
        <SignOut />
      </View>
    </ScrollView>
  );
};

export default Profile;
