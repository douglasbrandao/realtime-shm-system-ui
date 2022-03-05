import styled from 'styled-components';

const Wrapper = styled.span`
  width: auto;
  background-color: ${(props) => props.background};
  border-radius: 4px;
  padding: 8px;
  color: white;
`;

export default Wrapper;
