import styled from 'styled-components';

export const Wrapper = styled.div`
  flex: 2;

  .chatInfo {
    height: 50px;
    background-color: var(--primary-500);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    color: var(--primary-50);
    .chatIcons {
      display: flex;
      gap: 10px;

      svg {
        height: 24px;
        cursor: pointer;
      }
    }
  }
`;
