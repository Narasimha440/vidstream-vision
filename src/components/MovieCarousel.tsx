import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieCard } from './MovieCard';

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

interface MovieCarouselProps {
  title: string;
  movies: Movie[];
  onMoviePlay?: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
}

export function MovieCarousel({ title, movies, onMoviePlay, onAddToList }: MovieCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    const scrollAmount = 320; // Width of card + gap
    const newScrollLeft = scrollContainerRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount);
    
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('left')}
              className="opacity-70 hover:opacity-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll('right')}
              className="opacity-70 hover:opacity-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Movies Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-none w-64">
              <MovieCard
                movie={movie}
                onPlay={onMoviePlay}
                onAddToList={onAddToList}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}