import styled from 'styled-components';

const WhiteBox = styled.div`
  background-color: white;
  width: 48%;
  border-radius: 4px;
  padding: 12px;
  height: 500px;
  box-shadow: 6px 0px 18px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;

  @media screen and (max-width: 1400px) {
    width: 100%;
  }
`;

export default WhiteBox;
