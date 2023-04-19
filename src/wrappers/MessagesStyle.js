import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: var(--primary-50);
  padding: 10px;
  height: calc(100% - 100px);
  overflow: scroll;

  .message {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;

    .messageInfo {
      display: flex;
      flex-direction: column;
      color: var(--grey-700);
      font-weight: 300;

      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
    .messageContent {
      max-width: 80%;
      display: flex;
      flex-direction: column;
      gap: 10px;

      p {
        background-color: var(--white);
        padding: 10px 20px;
        border-radius: 0px 10px 10px 10px;
        max-width: max-content;
      }

      img {
        width: 50%;
      }
    }
    &.owner {
      flex-direction: row-reverse;

      .messageContent {
        align-items: flex-end;
        p {
          background-color: var(--primary-400);
          color: var(--white);
          border-radius: 10px 0px 10px 10px;
        }
      }
    }
  }
`;
