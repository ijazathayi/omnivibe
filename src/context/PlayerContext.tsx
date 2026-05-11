import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import type { Track } from '../types';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  queue: Track[];
  playTrack: (track: Track, newQueue?: Track[]) => void;
  togglePlayPause: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (value: number) => void;
  setVolume: (value: number) => void;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) throw new Error('usePlayer must be used within a PlayerProvider');
  return context;
};

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(1);
  const [queue, setQueue] = useState<Track[]>([]);
  
  const audioRef = useRef<HTMLAudioElement>(new Audio());

  useEffect(() => {
    const audio = audioRef.current;
    
    const updateProgress = () => setProgress(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => playNext();

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, currentTrack]);

  const playTrack = (track: Track, newQueue?: Track[]) => {
    setCurrentTrack(track);
    if (newQueue) setQueue(newQueue);
    
    audioRef.current.src = track.previewUrl;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    if (queue.length === 0 || !currentTrack) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex < queue.length - 1) {
      playTrack(queue[currentIndex + 1]);
    } else {
      // Loop or stop
      setIsPlaying(false);
    }
  };

  const playPrevious = () => {
    if (queue.length === 0 || !currentTrack) return;
    // If progress is more than 3 seconds, restart current track
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }
    
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    if (currentIndex > 0) {
      playTrack(queue[currentIndex - 1]);
    }
  };

  const seek = (value: number) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  const setVolume = (value: number) => {
    audioRef.current.volume = value;
    setVolumeState(value);
  };

  return (
    <PlayerContext.Provider value={{
      currentTrack,
      isPlaying,
      progress,
      duration,
      volume,
      queue,
      playTrack,
      togglePlayPause,
      playNext,
      playPrevious,
      seek,
      setVolume
    }}>
      {children}
    </PlayerContext.Provider>
  );
};
