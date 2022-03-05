import React from 'react';
import PropTypes from 'prop-types';
import ButtonStyle from './styles';

function Button(props) {
  const { children } = props;
  return <ButtonStyle {...props}>{children}</ButtonStyle>;
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Button;
