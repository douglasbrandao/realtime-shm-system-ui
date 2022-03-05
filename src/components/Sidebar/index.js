import React from 'react';
import {
  MdComputer,
  MdInsertChart,
  MdSettings,
  MdAccountCircle,
  MdShowChart,
} from 'react-icons/md';
import PropTypes from 'prop-types';
import { Container, Divider } from './styles';
import SideBarItem from './SideBarItem';
import ProfileInfo from './ProfileInfo';

function Sidebar({ open }) {
  return (
    <Container open={open}>
      <ProfileInfo />
      <SideBarItem
        icon={<MdComputer />}
        description="Dashboard"
        url="/dashboard"
      />
      <SideBarItem
        icon={<MdShowChart />}
        description="Make Analysis"
        url="/make-analysis"
      />
      <SideBarItem
        icon={<MdInsertChart />}
        description="Metrics"
        url="/metrics"
      />
      <SideBarItem
        icon={<MdSettings />}
        description="Add Initial Configuration"
        url="/initial-configuration"
      />
      <SideBarItem
        icon={<MdSettings />}
        description="Report"
        url="/report"
      />
      <Divider />
      <SideBarItem
        icon={<MdAccountCircle />}
        description="Profile Settings"
        url="/profile"
      />
    </Container>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
};

export default Sidebar;
