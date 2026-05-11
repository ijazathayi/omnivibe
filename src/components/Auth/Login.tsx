import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Music } from 'lucide-react';

const Login: React.FC = () => {
  const { signInWithGoogle, error } = useAuth();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'var(--bg-base)',
      color: 'white',
      textAlign: 'center'
    }}>
      <div className="animate-slide-up" style={{
        backgroundColor: 'var(--bg-elevated)',
        padding: '3rem',
        borderRadius: '16px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        maxWidth: '400px',
        width: '90%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Music size={48} color="var(--accent-color)" />
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Omnivibe</h1>
        </div>
        
        <p style={{ color: 'var(--text-subdued)' }}>
          Log in to continue to the ultimate music experience.
        </p>

        {error && (
          <div style={{
            backgroundColor: 'rgba(255, 50, 50, 0.1)',
            border: '1px solid rgba(255, 50, 50, 0.5)',
            color: '#ff6b6b',
            padding: '1rem',
            borderRadius: '8px',
            fontSize: '0.875rem',
            width: '100%'
          }}>
            <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Authentication Error:</p>
            <p>{error}</p>
            {error.includes('auth/unauthorized-domain') && (
              <p style={{ marginTop: '0.5rem', color: '#ffa502' }}>
                Note: You need to add this domain (e.g. localhost) to your Firebase Console under Authentication &gt; Settings &gt; Authorized Domains.
              </p>
            )}
            {error.includes('auth/configuration-not-found') && (
              <p style={{ marginTop: '0.5rem', color: '#ffa502' }}>
                Note: You need to enable the Google sign-in provider in your Firebase Console under Authentication &gt; Sign-in method.
              </p>
            )}
          </div>
        )}

        <button 
          onClick={signInWithGoogle}
          style={{
            backgroundColor: 'var(--accent-color)',
            color: '#000',
            padding: '12px 32px',
            borderRadius: '30px',
            fontSize: '1rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            transition: 'transform 0.2s, background-color 0.2s',
            width: '100%'
          }}
          onMouseOver={e => {
            e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseOut={e => {
            e.currentTarget.style.backgroundColor = 'var(--accent-color)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
