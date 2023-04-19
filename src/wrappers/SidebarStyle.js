import styled from 'styled-components';

export const Wrapper = styled.aside`
  flex: 1;
  background-color: var(--primary-700);

  nav {
    width: 100%;
    display: flex;
    align-items: center;
    background-color: var(--primary-900);
    height: 50px;
    padding: 10px;
    justify-content: space-between;
    color: var(--grey-50);

    .user {
      display: flex;
      gap: 10px;

      .photo {
        background-color: var(--grey-50);
        height: 24px;
        width: 24px;
        border-radius: 50%;
        overflow: hidden;
      }
      span {
        text-transform: capitalize;
      }
    }

    button {
      font-size: 10px;
    }
  }

  .userChat {
    padding: 6px 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--white);
    cursor: pointer;

    &:hover {
      background-color: var(--primary-600);
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .userChatInfo {
      span {
        font-size: 16px;
        font-weight: bold;
      }
      p {
        font-size: 12px;
        color: var(--grey-200);
        margin: -3px;
      }
    }
  }
`;
