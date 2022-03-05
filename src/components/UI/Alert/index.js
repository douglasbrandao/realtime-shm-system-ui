import React from 'react';
import PropTypes from 'prop-types';
import { MdError, MdCheckCircle } from 'react-icons/md';
import Wrapper from './styles';

function getColorsAlert(type) {
  let background = null;
  let border = null;
  let icon = null;

  switch (type) {
    case 'success':
      background = 'var(--success-background)';
      border = 'var(--success-border)';
      icon = <MdCheckCircle color="#18C935" />;
      break;
    case 'danger':
      background = 'var(--danger-background)';
      border = 'var(--danger-border)';
      icon = <MdError color="#FF8F8F" />;
      break;
    case 'warning':
      background = 'var(--warning-background)';
      border = 'var(--warning-border)';
      break;
    default:
      background = 'var(--primary-background)';
      border = 'var(--primary-border)';
      break;
  }

  return { background, border, icon };
}

function Alert({ children, type }) {
  const { background, border, icon } = getColorsAlert(type);

  return (
    <Wrapper background={background} border={border}>
      {icon}
      {children}
    </Wrapper>
  );
}

Alert.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
};

export default Alert;
