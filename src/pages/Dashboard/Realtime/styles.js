import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
  gap: 10px;
  flex-direction: column;

  @media screen and (max-width: 1400px) {
    width: 70%;
  }

  @media screen and (max-width: 1100px) {
    width: 80%;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
`;

const Status = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  width: 100%;
  height: 42px;

  div.badges {
    display: flex;
    gap: 10px;
  }
`;

const Info = styled.div`
  width: 48%;
  display: flex;
  gap: .25rem;
  margin: .4rem 0 0.3rem 0;
  flex-direction: column;

  h3 {
    font-weight: 600;
    margin-bottom: .25rem;
  }

  @media screen and (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
  }
`;

export {
  Container, Row, Status, Info,
};
