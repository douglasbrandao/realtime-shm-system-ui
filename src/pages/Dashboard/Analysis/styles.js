import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 49px;
  margin-bottom: 50px;
  height: auto;
  width: 90%;

  @media screen and (max-width: 1450px) {
    justify-content: center;
  }
`;

export default Container;
