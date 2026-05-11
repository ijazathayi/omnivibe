export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  previewUrl: string;
  duration?: number;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverArt: string;
  tracks: Track[];
}

export interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}
