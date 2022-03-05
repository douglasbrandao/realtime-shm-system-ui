import styled from 'styled-components';

const StyledTable = styled.table`
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  padding: 40px;
  table-layout: fixed;
  background-color: white;
  border-radius: 10px;
  box-shadow: 6px 0px 18px 0 rgba(0, 0, 0, 0.06);

  caption {
    font-size: 1.5rem;
    font-weight: 500;
    display: block;
    text-align: left;
    margin-bottom: 25px;
  }

  thead {
    display: table-row-group;
  }

  thead th {
    font-weight: 500;
  }

  th,
  td {
    word-wrap: break-word;
    color: var(--text-color);
    font-weight: normal;
    font-size: 0.8rem;
    padding-bottom: 10px;
    text-align: left;

    .options-buttons {
      svg {
        color: var(--svg-color);
        transform: scale(1.5);
      }
    }
  }

  .options-icons {
    display: flex;
    gap: 10px;
  }

  button {
    background-color: transparent;
    cursor: pointer;

    svg {
      color: var(--text-color);
      transform: scale(1.5);
    }
  }

  @media screen and (max-width: 1100px) {
    width: 100%;

    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      display: none;
      padding: 2rem;
    }

    tbody tr {
      margin-bottom: 1em;
    }

    tbody td {
      position: relative;
      padding-left: 50%;
    }

    tbody td:before {
      position: absolute;
      content: attr(data-label);
      top: 0px;
      left: 0px;
      width: 45%;
      white-space: normal;
      font-weight: 500;
    }
  }
`;

export default StyledTable;
