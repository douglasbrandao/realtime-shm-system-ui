import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 208px;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 35px;

  img {
    width: 46px;
    height: 46px;
    background: var(--background);
    background-size: 100%;
    border: 1px solid var(--background);
    border-radius: 50%;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  width: 150px;
  word-wrap: break-word;

  span {
    color: var(--text-email);
    font-style: italic;
  }
`;
