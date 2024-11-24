import './index.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // useNavigate para redirecionar o usuário
import axios from 'axios';

export const UserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    role: '',
    photo: '', // Para armazenar o caminho da foto do usuário
  });

  const navigate = useNavigate(); // Hook para redirecionamento

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  // Para lidar com o upload da foto
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfo({
        ...userInfo,
        photo: file, // Armazena o arquivo da foto
      });
    }
  };

  // Busca os dados do usuário na montagem do componente
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          photo: response.data.photo, // Preenche com a foto, se existir
        });
      } catch (error) {
        console.error('Erro ao carregar os dados do perfil', error);
      }
    };

    fetchUserInfo();
  }, []);

  // Função para atualizar o usuário
  const updateUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', userInfo.username);
    formData.append('email', userInfo.email);
    if (userInfo.photo instanceof File) {
      formData.append('photo', userInfo.photo); // Adiciona o arquivo da foto ao FormData
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        'http://localhost:5000/api/auth/atualiza', // Alterado para a rota correta
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data', // Importante para enviar arquivos
          },
        }
      );

      alert(response.data.message); // Exibe mensagem de sucesso

      // Atualize o estado com a URL da nova foto (assumindo que a resposta do servidor retorna a URL da foto)
      setUserInfo({
        ...userInfo,
        photo: response.data.user.photo, // Atualiza com a nova foto
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar os dados');
    }
  };

  // Função para deslogar o usuário
  const logout = () => {
    localStorage.removeItem('token'); // Remove o token
    navigate('/'); // Redireciona para a página inicial
  };

  return (
    <div className="user-info">
      <Link to="/">voltar</Link>
      <button onClick={logout} style={{ marginLeft: '10px' }}>
        deslogar
      </button>
      <form onSubmit={updateUser}>
        <input
          type="text"
          name="username"
          placeholder="Nome de usuário"
          value={userInfo.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userInfo.email}
          onChange={handleChange}
        />
        <input
          type="file"
          name="photo"
          onChange={handleFileChange} 
        />
        <button type="submit">Atualizar</button>
      </form>
      <p>Nome de Usuário: {userInfo.username}</p>
      <p>Email: {userInfo.email}</p>

      {userInfo.photo && (
        <img src={`http://localhost:5000/${userInfo.photo}`} alt="Foto de perfil" />
      )}
    </div>
  );
};
