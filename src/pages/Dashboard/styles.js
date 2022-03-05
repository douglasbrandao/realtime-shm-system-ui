import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: 256px 1fr;
  grid-template-rows: 60px 1fr;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.main`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  width: 100%;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  padding-bottom: 3rem;

  @media screen and (max-width: 800px) {
    & {
      grid-column: 1 / 3;
    }
  }
`;

export { Container, Content };
