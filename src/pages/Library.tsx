import React from 'react';
import { Music } from 'lucide-react';

const Library: React.FC = () => {
  return (
    <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Your Library</h1>
      
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '1rem'
      }}>
        <Music size={64} color="var(--text-subdued)" />
        <h2 style={{ fontSize: '1.5rem' }}>It's a bit empty here...</h2>
        <p style={{ color: 'var(--text-subdued)', maxWidth: '400px', textAlign: 'center' }}>
          Find songs you love and they will appear here. For now, try searching for your favorite artists or check out the home page recommendations!
        </p>
      </div>
    </div>
  );
};

export default Library;
