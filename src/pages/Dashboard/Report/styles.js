import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 90%;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  form {
    width: 98%;
  }

  @media screen and (max-width: 1400px) {
    width: 70%;

    form {
      width: 100%;
    }
  }

  @media screen and (max-width: 1100px) {
    width: 80%;
  }
`;

const Row = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: flex-start;

  div {
    width: 100%;
  }

  select {
    width: 100%;
  }

  div.metric__checkbox_realtime {
    label {
      display: flex;
      align-items: center;
    }

    input[type='checkbox'] {
      margin-left: 0.365em;
    }
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;

export { Container, Row };
