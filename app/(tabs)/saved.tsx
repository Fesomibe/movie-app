import React, { useState, useCallback } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getSavedFavorites, handleFavoriteToggle } from '@/services/appwrite';
import { icons } from '@/constants/icons';
import { Link } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

export default function Saved() {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const saved = await getSavedFavorites();
      setFavorites(saved);
    } catch (err) {
      console.log('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavorites();
    }, [])
  );

  const toggleFavorite = async (item: any) => {
    const movie = {
      id: item.movie_id,
      title: item.title,
      poster_path: item.poster_url.replace('https://image.tmdb.org/t/p/w500', ''),
      vote_average: item.vote_average,
      release_date: item.release_date,
    };

    try {
      const result = await handleFavoriteToggle(movie);

      if (result === 'added') {
        setFavorites((prev) => [
          ...prev,
          { ...item, $id: item.$id || `temp-${item.movie_id}` },
        ]);
      } else if (result === 'removed') {
        setFavorites((prev) =>
          prev.filter((m) => m.movie_id !== item.movie_id)
        );
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-primary px-6">
        <Text className="text-white text-lg">No saved movies yet.</Text>
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1 px-6 pt-10">
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.$id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
        ListHeaderComponent={
          <View>
            <Image source={icons.logo} className="w-12 h-10 mt-10 mb-5 mx-auto" />
            <Text className="text-lg text-white font-bold mt-5 mb-3">Saved Movies</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="w-[48%] relative">
            <Link href={`/movies/${item.movie_id}`} asChild>
              <TouchableOpacity>
                <Image
                  source={{ uri: item.poster_url }}
                  className="w-full h-52 rounded-lg"
                  resizeMode="stretch"
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
                  {item.title}
                </Text>
                <View className="flex-row items-center justify-start gap-x-1">
                  <Image source={icons.star} className="size-4" />
                  <Text className="text-xs text-white font-bold uppercase">
                    {Math.round(item.vote_average / 2)}
                  </Text>
                </View>
                <Text className="text-xs text-light-300 font-medium mt-1">
                  {item.release_date?.split('-')[0]}
                </Text>
              </TouchableOpacity>
            </Link>

            <TouchableOpacity
              onPress={() => toggleFavorite(item)}
              className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded"
            >
              <Text className="text-white text-xs font-bold">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
