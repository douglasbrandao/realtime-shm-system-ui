import styled from 'styled-components';

export const Wrapper = styled.header`
  background: white;
  grid-column: 1 / 3;
  display: flex;
  justify-content: space-between;
  z-index: 3;
  align-items: center;
  box-shadow: 0px 5px 8px 0px rgba(0, 0, 0, 0.06);

  a {
    display: flex;
    align-items: center;
    transition: color 0.3s ease-out;
    margin-right: 30px;

    svg {
      color: var(--svg-color);
    }

    span {
      margin-left: 10px;
      color: inherit;
    }

    &:hover {
      svg {
        color: var(--svg-hover);
      }
    }
  }
`;

export const ResponsiveMenuIcon = styled.div`
  margin-left: 32px;
  display: none;
  cursor: pointer;

  div.line {
    width: 30px;
    height: 3px;
    background-color: var(--text-color);
    margin: 6px 0;
  }

  @media screen and (max-width: 800px) {
    display: initial;
  }
`;

export const Logo = styled.div`
  margin-left: 32px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;
