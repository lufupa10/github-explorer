import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Home.css';

function Home() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (username.trim()) {
      navigate(`/user/${username}`);
    }
  };

  return (
    <div className="container home">
      <h1>GitHub<span className='logo'>Explorer</span></h1>
      <div className="form">
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Digite o nome de usuário do GitHub"
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
    </div>
  );
}

export default Home;
