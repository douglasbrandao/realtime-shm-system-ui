import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  background-color: white;
  box-shadow: 6px 0 18px 0 rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  transition: width 0.3s ease-out;

  @media screen and (min-width: 600px) {
    width: 436px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Logo = styled.img`
  border: 0;
  margin-bottom: 45px;
`;

export { Wrapper, Container, Logo };
