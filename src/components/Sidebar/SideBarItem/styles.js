import styled from 'styled-components';

const Wrapper = styled.div`
  width: 192px;
  margin-top: 21px;

  a {
    display: flex;
    align-items: center;
    transition: color 0.3s ease-out;

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

  .activeLink {
    color: var(--text-hover);

    svg {
      color: var(--svg-hover);
    }
  }
`;

export default Wrapper;
