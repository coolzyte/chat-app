import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  background-color: var(--white);
  padding: 10px;

  input {
    width: 100%;
    border: none;
    outline: none;
    color: var(--primary-900);
    font-size: 18px;

    &::placeholder {
      color: var(--grey-200);
    }
  }

  .inputItems {
    display: flex;
    gap: 10px;

    svg {
      margin-top: 4px;
      height: 24px;
      cursor: pointer;
      color: var(--grey-200);
    }
  }
`;
