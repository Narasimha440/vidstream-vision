import { useState } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { MovieCarousel } from '@/components/MovieCarousel';
import { VideoPlayer } from '@/components/VideoPlayer';
import movie1 from '@/assets/movie-1.jpg';
import movie2 from '@/assets/movie-2.jpg';
import movie3 from '@/assets/movie-3.jpg';

interface Movie {
  id: string;
  title: string;
  poster: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
  description: string;
}

const Index = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState<Movie | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample movie data
  const sampleMovies: Movie[] = [
    {
      id: '1',
      title: 'Dark Horizon',
      poster: movie1,
      year: 2024,
      genre: 'Action',
      rating: 8.5,
      duration: '2h 15m',
      description: 'A thrilling action-packed adventure that takes you to the edge of the world and beyond. Experience breathtaking visuals and heart-pounding action sequences.'
    },
    {
      id: '2',
      title: 'Stellar Odyssey',
      poster: movie2,
      year: 2024,
      genre: 'Sci-Fi',
      rating: 9.2,
      duration: '2h 45m',
      description: 'Journey through the cosmos in this epic space adventure. Discover new worlds, alien civilizations, and the mysteries of the universe.'
    },
    {
      id: '3',
      title: 'Shadow Realm',
      poster: movie3,
      year: 2023,
      genre: 'Horror',
      rating: 7.8,
      duration: '1h 55m',
      description: 'Enter a world where nightmares become reality. A spine-chilling horror experience that will keep you on the edge of your seat.'
    },
    {
      id: '4',
      title: 'Urban Legends',
      poster: movie1,
      year: 2023,
      genre: 'Thriller',
      rating: 8.1,
      duration: '2h 5m',
      description: 'Uncover the truth behind the city\'s darkest secrets. A psychological thriller that blurs the line between reality and fiction.'
    },
    {
      id: '5',
      title: 'Quantum Shift',
      poster: movie2,
      year: 2024,
      genre: 'Sci-Fi',
      rating: 8.7,
      duration: '2h 30m',
      description: 'When reality itself becomes unstable, heroes must navigate through parallel dimensions to save existence as we know it.'
    },
    {
      id: '6',
      title: 'Midnight Terror',
      poster: movie3,
      year: 2023,
      genre: 'Horror',
      rating: 7.5,
      duration: '1h 48m',
      description: 'Something evil awakens when the clock strikes midnight. A supernatural horror that will haunt your dreams.'
    }
  ];

  const handleMoviePlay = (movie: Movie) => {
    setCurrentlyPlaying(movie);
  };

  const handleClosePlayer = () => {
    setCurrentlyPlaying(null);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // TODO: Implement search functionality
    console.log('Searching for:', query);
  };

  const handleAddToList = (movie: Movie) => {
    // TODO: Implement add to list functionality
    console.log('Added to list:', movie.title);
  };

  // Filter movies based on search query
  const filteredMovies = searchQuery
    ? sampleMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sampleMovies;

  // Organize movies by category
  const trendingMovies = sampleMovies.slice(0, 3);
  const actionMovies = sampleMovies.filter(movie => movie.genre === 'Action' || movie.genre === 'Thriller');
  const sciFiMovies = sampleMovies.filter(movie => movie.genre === 'Sci-Fi');
  const horrorMovies = sampleMovies.filter(movie => movie.genre === 'Horror');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onSearch={handleSearch} />
      
      {/* Main Content */}
      <main className="pt-16">
        {!searchQuery ? (
          <>
            {/* Hero Section */}
            <HeroSection
              onPlay={() => handleMoviePlay(sampleMovies[0])}
              onMoreInfo={() => console.log('More info clicked')}
            />

            {/* Movie Carousels */}
            <div className="space-y-8 py-8">
              <MovieCarousel
                title="Trending Now"
                movies={trendingMovies}
                onMoviePlay={handleMoviePlay}
                onAddToList={handleAddToList}
              />
              
              <MovieCarousel
                title="Action & Thrillers"
                movies={actionMovies}
                onMoviePlay={handleMoviePlay}
                onAddToList={handleAddToList}
              />
              
              <MovieCarousel
                title="Sci-Fi Adventures"
                movies={sciFiMovies}
                onMoviePlay={handleMoviePlay}
                onAddToList={handleAddToList}
              />
              
              <MovieCarousel
                title="Horror Collection"
                movies={horrorMovies}
                onMoviePlay={handleMoviePlay}
                onAddToList={handleAddToList}
              />
            </div>
          </>
        ) : (
          /* Search Results */
          <div className="container mx-auto px-4 py-24">
            <h2 className="text-2xl font-bold mb-6">
              Search Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMovies.map((movie) => (
                <div key={movie.id} className="w-full">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full aspect-[2/3] object-cover rounded-lg cursor-pointer hover:scale-105 transition-smooth"
                    onClick={() => handleMoviePlay(movie)}
                  />
                  <h3 className="mt-2 text-sm font-medium truncate">{movie.title}</h3>
                </div>
              ))}
            </div>
            {filteredMovies.length === 0 && (
              <p className="text-muted-foreground text-center py-8">
                No movies found matching your search.
              </p>
            )}
          </div>
        )}
      </main>

      {/* Video Player Modal */}
      {currentlyPlaying && (
        <VideoPlayer
          title={currentlyPlaying.title}
          onClose={handleClosePlayer}
        />
      )}
    </div>
  );
};

export default Index;