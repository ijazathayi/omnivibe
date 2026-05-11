import React, { useEffect, useState } from 'react';
import TrackList from '../components/TrackList';
import type { Track } from '../types';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch some default popular tracks from iTunes API for the home screen
    const fetchHomeTracks = async () => {
      try {
        const res = await fetch('https://itunes.apple.com/search?term=top+hits&media=music&limit=20');
        const data = await res.json();
        
        const fetchedTracks: Track[] = data.results.map((item: any) => ({
          id: item.trackId.toString(),
          title: item.trackName,
          artist: item.artistName,
          albumArt: item.artworkUrl100.replace('100x100', '300x300'), // Get higher quality image
          previewUrl: item.previewUrl
        })).filter((t: Track) => t.previewUrl); // Ensure we only get tracks with previews

        setTracks(fetchedTracks);
      } catch (error) {
        console.error("Failed to fetch tracks", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeTracks();
  }, []);

  return (
    <div style={{ paddingBottom: '2rem' }}>
      <div className="gradient-overlay" style={{ padding: '4rem 2rem 2rem 2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Good Evening, {user?.displayName?.split(' ')[0] || 'User'}
        </h1>
      </div>

      <div style={{ padding: '0 2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', marginTop: '2rem' }}>
          Recommended for you
        </h2>
        
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
            <div className="text-subdued">Loading tracks...</div>
          </div>
        ) : (
          <TrackList tracks={tracks} />
        )}
      </div>
    </div>
  );
};

export default Home;
