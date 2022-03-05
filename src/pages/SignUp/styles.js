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
  border-radius: 10px;
  box-shadow: 6px 0 18px 0 rgba(0, 0, 0, 0.06);
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
    align-items: center;
    width: 100%;

    img.form__img-preview {
      width: 5em;
      height: 5em;
      background: var(--background);
      border: 1px solid var(--background);
      background-size: 100%;
      border-radius: 50%;
      margin-bottom: 1em;
    }
  }
`;

const Logo = styled.img`
  border: 0;
  margin-bottom: 45px;
`;

export { Wrapper, Container, Logo };
