import React from 'react';
import type { Track } from '../types';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause } from 'lucide-react';

interface TrackListProps {
  tracks: Track[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  const { currentTrack, isPlaying, playTrack, togglePlayPause } = usePlayer();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0 2rem 2rem 2rem' }}>
      {tracks.map((track, index) => {
        const isCurrentTrack = currentTrack?.id === track.id;
        
        return (
          <div 
            key={track.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0.75rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: 'transparent',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-elevated-hover)';
              const btn = e.currentTarget.querySelector('.play-btn') as HTMLElement;
              if (btn && !isCurrentTrack) btn.style.opacity = '1';
              const num = e.currentTarget.querySelector('.track-num') as HTMLElement;
              if (num && !isCurrentTrack) num.style.opacity = '0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              const btn = e.currentTarget.querySelector('.play-btn') as HTMLElement;
              if (btn && !isCurrentTrack) btn.style.opacity = '0';
              const num = e.currentTarget.querySelector('.track-num') as HTMLElement;
              if (num && !isCurrentTrack) num.style.opacity = '1';
            }}
            onClick={() => {
              if (isCurrentTrack) {
                togglePlayPause();
              } else {
                playTrack(track, tracks);
              }
            }}
          >
            <div style={{ width: '40px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
              {isCurrentTrack ? (
                isPlaying ? 
                  <Pause size={16} color="var(--accent-color)" /> : 
                  <Play size={16} color="var(--accent-color)" fill="var(--accent-color)" />
              ) : (
                <>
                  <span className="track-num" style={{ position: 'absolute', color: 'var(--text-subdued)' }}>{index + 1}</span>
                  <div className="play-btn" style={{ position: 'absolute', opacity: 0, transition: 'opacity 0.2s' }}>
                    <Play size={16} fill="white" />
                  </div>
                </>
              )}
            </div>
            
            <img 
              src={track.albumArt} 
              alt={track.title} 
              style={{ width: '40px', height: '40px', borderRadius: '4px', marginRight: '1rem', objectFit: 'cover' }}
            />
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span style={{ 
                color: isCurrentTrack ? 'var(--accent-color)' : 'white',
                fontWeight: isCurrentTrack ? 'bold' : 'normal'
              }}>
                {track.title}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-subdued)' }}>{track.artist}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TrackList;
