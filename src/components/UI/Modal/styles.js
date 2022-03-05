import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  overflow-y: scroll;

  .modal-content {
    position: relative;
    background-color: white;
    border-radius: 0.625rem;
    margin: 100px auto;
    width: 500px;
  }

  .modal-header {
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e9ecef;
    font-size: 1.17rem;
  }

  .modal-body {
    padding: 1rem 2rem;
    height: auto;
    overflow: auto;

    button {
      background-color: var(--text-color);
    }
  }

  @media screen and (max-width: 600px) {
    .modal-content {
      width: 80%;
    }
  }
`;

export default Wrapper;
