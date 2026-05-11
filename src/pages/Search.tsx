import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import TrackList from '../components/TrackList';
import type { Track } from '../types';

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(false);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (!debouncedQuery) {
      setTracks([]);
      return;
    }

    const searchTracks = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(debouncedQuery)}&media=music&limit=30`);
        const data = await res.json();
        
        const fetchedTracks: Track[] = data.results.map((item: any) => ({
          id: item.trackId.toString(),
          title: item.trackName,
          artist: item.artistName,
          albumArt: item.artworkUrl100.replace('100x100', '300x300'),
          previewUrl: item.previewUrl
        })).filter((t: Track) => t.previewUrl);

        setTracks(fetchedTracks);
      } catch (error) {
        console.error("Failed to search tracks", error);
      } finally {
        setLoading(false);
      }
    };

    searchTracks();
  }, [debouncedQuery]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        position: 'sticky',
        top: '2rem',
        zIndex: 5,
        backgroundColor: 'var(--bg-elevated)',
        display: 'flex',
        alignItems: 'center',
        padding: '0.75rem 1rem',
        borderRadius: '30px',
        width: '100%',
        maxWidth: '400px',
        marginBottom: '2rem'
      }}>
        <SearchIcon size={20} color="var(--text-subdued)" style={{ marginRight: '0.5rem' }} />
        <input 
          type="text"
          placeholder="What do you want to listen to?"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            width: '100%',
            fontSize: '1rem',
            outline: 'none'
          }}
        />
      </div>

      {loading && <div className="text-subdued">Searching...</div>}
      
      {!loading && tracks.length > 0 && (
        <div className="animate-fade-in">
          <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Top Results</h2>
          <TrackList tracks={tracks} />
        </div>
      )}

      {!loading && query && tracks.length === 0 && debouncedQuery && (
        <div className="text-subdued">No results found for "{debouncedQuery}"</div>
      )}
    </div>
  );
};

export default Search;
