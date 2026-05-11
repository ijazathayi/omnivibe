import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import PlayerBar from './components/PlayerBar';
import Home from './pages/Home';
import Search from './pages/Search';
import Library from './pages/Library';
import Login from './components/Auth/Login';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div style={{ display: 'flex', height: '100vh', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar />
        <main style={{ flex: 1, overflowY: 'auto', backgroundColor: 'var(--bg-highlight)', position: 'relative' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
}

export default App;
