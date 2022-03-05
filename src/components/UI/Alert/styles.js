import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.background};
  width: 100%;
  border: 1px solid ${(props) => props.border};
  border-radius: 4px;
  padding: 5px;
  margin-bottom: 5px;

  svg {
    margin-right: 3px;
  }

  p,
  span {
    font-size: 13px;
    color: rgba(0, 0, 0, 0.65);
  }
`;

export default Wrapper;
