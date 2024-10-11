import { useState } from 'react';
import './Login.css'; // Asegúrate de importar el archivo CSS

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'a' && password === 'a') {
      alert('Login exitoso');
      onLogin(); // Llama a la función onLogin para cambiar el estado en App.tsx
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Iniciar Sesión</h2>
      <div className="login-form">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">Entrar</button>
      </div>
    </div>
  );
};

export default Login;