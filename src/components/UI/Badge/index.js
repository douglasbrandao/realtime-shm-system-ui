import React from 'react';
import PropTypes from 'prop-types';
import Wrapper from './styles';

function Badge({ text, type }) {
  let background = null;

  switch (type) {
    case 'success':
      background = 'var(--badge-success)';
      break;
    case 'warning':
      background = 'var(--badge-warning)';
      break;
    case 'danger':
      background = 'var(--badge-danger)';
      break;
    default:
      background = 'var(--badge-primary)';
  }

  return <Wrapper background={background}>{text}</Wrapper>;
}

Badge.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Badge;
