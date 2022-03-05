import React from 'react';
import { MdInput } from 'react-icons/md';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Wrapper, Logo, ResponsiveMenuIcon } from './styles';
import { useAuth } from '../../context/AuthContext';
import LogoSHM from '../../assets/logo-shm.svg';

function Header({ open, toggleOpen }) {
  const { handleSignOut } = useAuth();

  return (
    <Wrapper open={open}>
      <Logo>
        <Link to="/dashboard">
          <img src={LogoSHM} alt="" />
        </Link>
      </Logo>
      <ResponsiveMenuIcon onClick={toggleOpen}>
        <div className="line" />
        <div className="line" />
        <div className="line" />
      </ResponsiveMenuIcon>
      <Link to="#" onClick={handleSignOut}>
        <MdInput />
        <span>Log Out</span>
      </Link>
    </Wrapper>
  );
}

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
};

export default Header;
