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
    margin-right: 7px;
  }

  label > input[type='radio'] {
    margin-right: 3px;
  }
`;

export default Row;
