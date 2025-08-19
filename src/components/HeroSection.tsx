import { Play, Info, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Using a placeholder for hero background
const heroBackground = 'https://via.placeholder.com/1920x1080/1a1a1a/6366f1?text=Epic+Adventure';

interface FeaturedMovie {
  title: string;
  description: string;
  year: number;
  genre: string;
  rating: number;
  duration: string;
}

interface HeroSectionProps {
  featuredMovie?: FeaturedMovie;
  onPlay?: () => void;
  onMoreInfo?: () => void;
}

export function HeroSection({ featuredMovie, onPlay, onMoreInfo }: HeroSectionProps) {
  const defaultMovie: FeaturedMovie = {
    title: "Epic Adventure",
    description: "An incredible journey through mysterious worlds filled with danger, magic, and unforgettable characters. Experience the ultimate cinematic adventure that will keep you on the edge of your seat from start to finish.",
    year: 2024,
    genre: "Action/Adventure",
    rating: 8.7,
    duration: "2h 18m"
  };

  const movie = featuredMovie || defaultMovie;

  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroBackground}
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl space-y-6">
          {/* Movie Badge */}
          <Badge variant="secondary" className="w-fit">
            Featured Movie
          </Badge>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            {movie.title}
          </h1>

          {/* Movie Details */}
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{movie.rating}/10</span>
            </div>
            <span>•</span>
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <Badge variant="outline">{movie.genre}</Badge>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            {movie.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 glow-primary"
              onClick={onPlay}
            >
              <Play className="h-5 w-5 mr-2 fill-current" />
              Play Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-foreground hover:bg-white/10"
              onClick={onMoreInfo}
            >
              <Info className="h-5 w-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}