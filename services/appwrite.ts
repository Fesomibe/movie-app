import { Account, Client, Databases, ID, Query } from 'appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const FAVORITES_COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_FAVORITES_COLLECTION_ID!;

export const client = new Client()
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const databases = new Databases(client);
export const account = new Account(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.equal('searchTerm', query)
    ]);

    if(result.documents.length > 0) {
        const existingMovie = result.documents[0];

        await databases.updateDocument(
            DATABASE_ID, 
            COLLECTION_ID, 
            existingMovie.$id,
            {
                count: existingMovie.count + 1
            }
        )
    } else {
        await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        })
    }
} catch (error) {
    console.log(error);
    throw error;
}

    

    // check if a record has already been stored 
    // if a document is found increment the searchCount field 
    // if no document is found, 
        // create a new document in Appwrite database -> 1
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
        Query.limit(5),
        Query.orderDesc('count'),
    ]);

    return result.documents as unknown as TrendingMovie[];
    } catch (error) {
        console.log(error);
        return undefined;
    }
    
}


export const handleFavoriteToggle = async (
  movie: Movie
): Promise<'added' | 'removed' | null | SavedMovie> => {
  try {
    if (!movie?.id) {
      console.error('Movie ID is missing!', movie);
      return null;
    }

    const response = await databases.listDocuments(
      DATABASE_ID,
      FAVORITES_COLLECTION_ID,
      [Query.equal('movie_id', movie.id)]
    );

    if (response.total > 0) {
      const docId = response.documents[0].$id;
      await databases.deleteDocument(DATABASE_ID, FAVORITES_COLLECTION_ID, docId);
      return 'removed';
    } else {
      await databases.createDocument(DATABASE_ID, FAVORITES_COLLECTION_ID, ID.unique(), {
        movie_id: movie.id,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      });
      return 'added';
    }
  } catch (err) {
    console.error('Error toggling favorite:', err);
    return null;
  }
};


export const getSavedFavorites = async () => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      FAVORITES_COLLECTION_ID
    );

    return response.documents;
  } catch (err) {
    console.error('Error fetching favorites:', err);
    return [];
  }
};
