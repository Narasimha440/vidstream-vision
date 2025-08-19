import { useState } from 'react';
import { Play, Plus, ChevronDown, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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

interface MovieCardProps {
  movie: Movie;
  onPlay?: (movie: Movie) => void;
  onAddToList?: (movie: Movie) => void;
}

export function MovieCard({ movie, onPlay, onAddToList }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group cursor-pointer transition-smooth"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster */}
      <div className="relative overflow-hidden rounded-lg aspect-[2/3] bg-secondary">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
          <Button
            variant="ghost"
            size="icon"
            className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30"
            onClick={() => onPlay?.(movie)}
          >
            <Play className="h-8 w-8 text-white fill-white" />
          </Button>
        </div>
      </div>

      {/* Movie Info - appears on hover */}
      {isHovered && (
        <div className="absolute top-full left-0 right-0 bg-card border border-border rounded-lg p-4 mt-2 glow-card z-20 min-w-[300px]">
          <div className="space-y-3">
            {/* Title and Year */}
            <div>
              <h3 className="font-semibold text-lg">{movie.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.duration}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{movie.rating}/10</span>
                </div>
              </div>
            </div>

            {/* Genre */}
            <Badge variant="secondary" className="w-fit">
              {movie.genre}
            </Badge>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-3">
              {movie.description}
            </p>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="default"
                size="sm"
                className="flex-1"
                onClick={() => onPlay?.(movie)}
              >
                <Play className="h-4 w-4 mr-2" />
                Play
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onAddToList?.(movie)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}