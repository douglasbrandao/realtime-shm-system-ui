import React from 'react';
import PropTypes from 'prop-types';
import StyledTable from './styles';

function Table({ children }) {
  return <StyledTable>{children}</StyledTable>;
}

Table.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Table;
