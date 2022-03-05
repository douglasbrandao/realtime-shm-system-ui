import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const history = useHistory();

  const [info, setInfo] = useState(() => {
    const token = localStorage.getItem('@shm:token');
    const user = localStorage.getItem('@shm:user');

    if (token && user) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  async function handleSignIn({ email, password }) {
    await api
      .post('/api/signin', {
        email,
        password,
      })
      .then(({ data }) => {
        const { token, refreshToken, user } = data;
        localStorage.setItem('@shm:token', token);
        localStorage.setItem('@shm:refresh', refreshToken);
        localStorage.setItem('@shm:user', JSON.stringify(user));
        setInfo({ token, user });
        history.push('/dashboard');
      })
      .catch(({ response: { data } }) => {
        toast.error(data.error);
      });
  }

  async function handleSignUp({
    username, email, password, avatar,
  }) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('avatar', avatar);

    await api
      .post('/api/signup', formData)
      .then((response) => {
        toast.success(response.data.message);
      })
      .catch(({ response }) => toast.error(response.data.error));
  }

  function handleSignOut() {
    localStorage.removeItem('@shm:token');
    localStorage.removeItem('@shm:refresh');
    localStorage.removeItem('@shm:user');
    setInfo({});
    history.push('/');
  }

  return (
    <AuthContext.Provider
      value={{
        user: info.user,
        handleSignIn,
        handleSignUp,
        handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
