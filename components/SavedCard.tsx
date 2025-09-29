import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import { View, Text, TouchableOpacity, Image } from 'react-native'

const SavedCard = ({ poster_path, title, id, vote_average, release_date }: Movie) => {
  return (
    <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity className='w-[100%]'>
            <Image 
                source={{ uri: poster_path }}
                className='w-full h-52 rounded-lg'
                resizeMode='stretch'
            />

            <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
            <View>
                <Image source={icons.star} className="size-4" />
            <Text className="text-xs text-white font-bold uppercase">
                    {Math.round(vote_average / 2)}
                  </Text>
            </View>

        </TouchableOpacity>
    </Link>
  )
}

export default SavedCard