import styled from 'styled-components';

export const Container = styled.aside`
  background-color: white;
  grid-row: 2 / 3;
  grid-column: 1 / 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  transition: transform 0.15s ease-in-out;

  @media screen and (max-width: 800px) {
    & {
      grid-column: 1 / span 1;
      transform: ${(props) => (props.open ? 'translateX(0)' : 'translateX(-256px)')};
    }
  }
`;

export const Logo = styled.img`
  margin-top: 16px;

  @media screen and (max-width: 800px) {
    & {
      display: none;
    }
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border-top: 1px solid #ebeff2;
  margin-top: 21px;
`;
