import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  margin-top: 1.5rem;
  width: 90%;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 1.8rem;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const Card = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  flex-direction: column;
  border-radius: 0.75rem;
  box-shadow: 6px 0px 18px rgba(0, 0, 0, 0.04);

  div.dashboard__items {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  div.outer-svg {
    padding: .525rem;
    border-radius: .5rem;
    background-color: #f5f5f5;
  }

  svg {
    min-width: 2rem;
    min-height: 2rem;
    fill: var(--svg-color);
  }

  &:nth-child(1) {
    svg {
      fill: var(--badge-warning);
    }
  }

  &:nth-child(2) {
    svg {
      fill: var(--badge-success);
    }
  }

  &:nth-child(3) {
    svg {
      fill: var(--badge-danger);
    }
  }

  &:nth-child(4) {
    svg {
      fill: var(--badge-primary);
    }
  }

  &:nth-child(5) {
    align-content: flex-start;
    grid-column-start: 1;
    grid-column-end: 5;
  }

  div.info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  span.info__title {
    font-size: .75rem;
    text-transform: uppercase;
    font-weight: 500;
    color: var(--text-email);
  }

  span.info__total {
    margin-top: 0.375rem;
    font-size: 2rem;
    font-weight: 600;
  }
`;

export { Container, Card };
