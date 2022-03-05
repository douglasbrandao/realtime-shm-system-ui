import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ component }) {
  const Component = component;
  const { user } = useAuth();
  return user ? <Component /> : <Redirect to="/" />;
}

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
