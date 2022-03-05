import styled from 'styled-components';

const ButtonStyle = styled.button`
  width: ${(props) => (props.width ? props.width : '100%')};
  padding: 12px;
  background-color: var(--button-background);
  color: white;
  font-weight: bold;
  margin-bottom: 10px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
  box-shadow: 4px 0 10px 0 #d2d3d2;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};

  &:disabled {
    color: #5f7b9f;
  }

  &:hover:enabled {
    background-color: var(--button-hover);
  }
`;

export default ButtonStyle;
