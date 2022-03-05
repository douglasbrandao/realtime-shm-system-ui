import React from 'react';
import { Wrapper, UserInfo } from './styles';
import { useAuth } from '../../../context/AuthContext';
// import Avatar from '../../../assets/avatar.svg'

function ProfileInfo() {
  const { user } = useAuth();

  return (
    <Wrapper>
      <img
        src={`${process.env.REACT_APP_HOST}/${user.avatar_url}`}
        alt=""
      />
      <UserInfo>
        <h4>{user.username}</h4>
        <span>{user.email}</span>
      </UserInfo>
    </Wrapper>
  );
}

export default ProfileInfo;
