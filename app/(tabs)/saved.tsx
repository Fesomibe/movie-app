import React from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getSavedFavorites } from '@/services/appwrite';
import { icons } from '@/constants/icons';
import useFetch from '@/services/useFetch';
import { Link } from 'expo-router';

export default function Saved() {
  const {
    data: isFavorite,
    loading: favoriteLoading,
    error: favoriteError,
  } = useFetch(() => getSavedFavorites());

  if (favoriteLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (favoriteError) {
    return (
      <View className="flex-1 justify-center items-center bg-primary px-6">
        <Text className="text-red-500 text-lg">Failed to load favorites.</Text>
      </View>
    );
  }

  if (!isFavorite || isFavorite.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-primary px-6">
        <Text className="text-white text-lg">No saved movies yet.</Text>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1 px-6 pt-10">
      <FlatList
        data={isFavorite}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
        ListHeaderComponent={
          <View>
            <Image
              source={icons.logo}
              className="w-12 h-10 mt-10 mb-5 mx-auto"
            />
            <Text className="text-lg text-white font-bold mt-5 mb-3">
              Saved Movies
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Link href={`/movies/${item.movie_id}`} asChild>
            <TouchableOpacity className="w-[48%]">
              <View className="relative">
                <Image
                  source={{ uri: item.poster_url }}
                  className="w-full h-52 rounded-lg"
                  resizeMode="stretch"
                />
                <Text
                  className="text-sm font-bold text-white mt-2"
                  numberOfLines={1}
                >
                  {item.title}
                </Text>
                <View className="flex-row items-center justify-start gap-x-1">
                  <Image source={icons.star} className="size-4" />
                  <Text className="text-xs text-white font-bold uppercase">
                    {Math.round(item.vote_average / 2)}
                  </Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <Text className="text-xs text-light-300 font-medium mt-1">
                    {item.release_date?.split('-')[0]}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
