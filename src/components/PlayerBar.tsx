import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const PlayerBar: React.FC = () => {
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration, 
    volume,
    togglePlayPause, 
    playNext, 
    playPrevious,
    seek,
    setVolume
  } = usePlayer();

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      height: 'var(--player-height)',
      backgroundColor: 'var(--bg-player)',
      borderTop: '1px solid var(--divider)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1rem',
      justifyContent: 'space-between',
      position: 'relative',
      zIndex: 10
    }}>
      {/* Track Info */}
      <div style={{ width: '30%', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {currentTrack ? (
          <>
            <img 
              src={currentTrack.albumArt} 
              alt={currentTrack.title}
              style={{ width: '56px', height: '56px', borderRadius: '4px', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{currentTrack.title}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-subdued)' }}>{currentTrack.artist}</span>
            </div>
          </>
        ) : (
          <div style={{ color: 'var(--text-subdued)', fontSize: '0.9rem' }}>No track playing</div>
        )}
      </div>

      {/* Controls */}
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={playPrevious} className="text-subdued">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button 
            onClick={togglePlayPause}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'white',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" style={{ marginLeft: '2px' }} />}
          </button>
          <button onClick={playNext} className="text-subdued">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>
        
        {/* Progress Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', maxWidth: '400px' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subdued)', width: '35px', textAlign: 'right' }}>
            {formatTime(progress)}
          </span>
          <input 
            type="range" 
            min={0} 
            max={duration || 100} 
            value={progress || 0}
            onChange={(e) => seek(Number(e.target.value))}
            style={{
              flex: 1,
              height: '4px',
              borderRadius: '2px',
              appearance: 'none',
              backgroundColor: 'var(--bg-elevated-hover)',
              cursor: 'pointer',
              outline: 'none'
            }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subdued)', width: '35px' }}>
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Volume */}
      <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.5rem' }}>
        <Volume2 size={20} className="text-subdued" />
        <input 
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{
            width: '100px',
            height: '4px',
            borderRadius: '2px',
            appearance: 'none',
            backgroundColor: 'var(--bg-elevated-hover)',
            cursor: 'pointer'
          }}
        />
      </div>
    </div>
  );
};

export default PlayerBar;
