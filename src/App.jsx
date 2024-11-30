import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import UserDetails from './pages/UserDetails/UserDetails';
import RepoDetails from './pages/RepoDetails/RepoDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:username" element={<UserDetails />} />
      <Route path="/repo/:owner/:repo" element={<RepoDetails />} />
    </Routes>
  );
}

export default App;
