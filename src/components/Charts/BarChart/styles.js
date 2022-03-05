import styled from 'styled-components';

const WhiteBox = styled.div`
  background-color: white;
  width: 48%;
  border-radius: 4px;
  padding: 12px;
  box-shadow: 6px 0px 18px rgba(0, 0, 0, 0.06);

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

export default WhiteBox;
