import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Link } from 'expo-router';
import { icons } from '@/constants/icons';
import { handleFavoriteToggle } from '@/services/appwrite';

const MovieCard = ({ movie }: { movie: Movie }) => {
  const { id, poster_path, title, vote_average, release_date } = movie;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = async () => {
    try {
      const result = await handleFavoriteToggle(movie);
      if (result) setIsFavorite(true);
      else if (!result) setIsFavorite(false);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <View className="relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://placehold.co/600x400/1a1a1a/ffffff.png',
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />

          {/* ❤️ Favorite Button */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              toggleFavorite();
            }}
            className="absolute top-2 right-2 z-10"
          >
            <Text className="text-xl">{isFavorite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        </View>

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split('-')[0]}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
