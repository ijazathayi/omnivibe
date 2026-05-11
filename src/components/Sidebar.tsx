import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Music, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.5rem 1rem',
    color: isActive ? 'var(--text-base)' : 'var(--text-subdued)',
    fontWeight: isActive ? 'bold' : 'normal',
    transition: 'color 0.2s',
    textDecoration: 'none',
    borderRadius: '4px'
  });

  return (
    <div style={{
      width: 'var(--sidebar-width)',
      backgroundColor: 'var(--bg-sidebar)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      height: '100%',
      borderRight: '1px solid var(--divider)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', padding: '0 1rem' }}>
        <Music size={32} color="var(--accent-color)" />
        <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Omnivibe</h1>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
        <NavLink to="/" style={navLinkStyle}>
          <Home size={24} />
          Home
        </NavLink>
        <NavLink to="/search" style={navLinkStyle}>
          <Search size={24} />
          Search
        </NavLink>
        <NavLink to="/library" style={navLinkStyle}>
          <Library size={24} />
          Your Library
        </NavLink>
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--divider)', paddingTop: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem' }}>
          {user?.photoURL && (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              style={{ width: '32px', height: '32px', borderRadius: '50%' }} 
            />
          )}
          <span style={{ fontSize: '0.9rem', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user?.displayName || 'User'}
          </span>
          <button 
            onClick={logout}
            style={{ color: 'var(--text-subdued)', cursor: 'pointer', padding: '4px' }}
            title="Log out"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
