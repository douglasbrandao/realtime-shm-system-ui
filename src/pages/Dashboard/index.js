import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import { Container, Content } from './styles';

function Dashboard({ children }) {
  const [open, setOpen] = useState(false);

  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <Container>
      <Header open={open} toggleOpen={toggleOpen} />
      <Sidebar open={open} />
      <Content>{children}</Content>
    </Container>
  );
}

Dashboard.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Dashboard;
