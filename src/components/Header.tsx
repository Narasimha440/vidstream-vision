import { useState } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-primary">StreamFlix</h1>
          
          {/* Navigation - hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Home
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              Movies
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              TV Shows
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              My List
            </Button>
          </nav>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 bg-secondary border-border"
                  autoFocus
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  ×
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>

          {/* Mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}