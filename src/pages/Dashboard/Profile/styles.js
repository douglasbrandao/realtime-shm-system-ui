import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0px 30px 30px 30px;

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

const WhiteBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: .25rem;
  width: 80%;
  height: auto;
  transition: width 0.3s ease-out;
  box-shadow: .4rem 0 1.15rem 0 rgba(0, 0, 0, 0.06);

  div.header {
    padding: 1rem 1.75rem 0px 2rem;
  }

  @media screen and (min-width: 1200px) {
    width: 50%;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border-top: 1px solid #ebeff2;
  margin-top: 21px;
  margin-bottom: 21px;
`;

export { Container, WhiteBox, Divider };
