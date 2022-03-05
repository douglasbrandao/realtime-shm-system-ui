import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;

  div {
    width: 100%;
  }

  label {
    margin-right: 1rem;
  }

  input[type='radio'] {
    margin-right: 0.350rem;
  }
`;

export default Row;
