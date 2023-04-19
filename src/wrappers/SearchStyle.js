import styled from 'styled-components';

export const Wrapper = styled.div`
  border-bottom: 1px solid var(--grey-200);

  .searchForm {
    .form-row {
      margin-bottom: 0px;
    }
    padding: 0 10px;
    input {
      background-color: transparent;
      border: none;
      outline: none;
      color: var(--white);
      &::placeholder {
        color: var(--grey-100);
      }
    }
  }
`;
