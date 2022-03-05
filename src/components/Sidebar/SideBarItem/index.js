import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Wrapper from './styles';

function SideBarItem({ icon, description, url }) {
  return (
    <Wrapper>
      <NavLink activeClassName="activeLink" to={url}>
        {icon}
        <span>{description}</span>
      </NavLink>
    </Wrapper>
  );
}

SideBarItem.propTypes = {
  description: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  url: PropTypes.string.isRequired,
};

export default SideBarItem;
