import React, { createContext, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../services/api';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const history = useHistory();

  const [info, setInfo] = useState(() => {
    const token = localStorage.getItem('@shm:token');
    const user = localStorage.getItem('@shm:user');

    if (token) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  async function handleSignIn({ email, password }, setServerAnswer) {
    await api
      .post('/api/token/', {
        email,
        password,
      })
      .then(({ data }) => {
        const { access, refresh, user } = data;
        localStorage.setItem('@shm:token', access);
        localStorage.setItem('@shm:refresh', refresh);
        localStorage.setItem('@shm:user', JSON.stringify(user));
        setInfo({ token: access, user });
        history.push('/dashboard');
      })
      .catch(({ response: { data } }) => {
        setServerAnswer(data.detail);
      });
  }

  async function handleSignUp({ username, email, password }, setServerAnswer) {
    await api
      .post('/users/signup/', {
        email,
        username,
        password,
      })
      .then(({ data }) => {
        setServerAnswer(data);
      })
      .catch(({ response: { data } }) => {
        setServerAnswer(data);
      });
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
