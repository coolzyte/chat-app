import styled from 'styled-components';

const Wrapper = styled.section`
  background-color: var(--primary-100);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  .container {
    border: 1px solid white;
    border-radius: var(--borderRadius);
    width: 65%;
    height: 80%;
    display: flex;
    overflow: hidden;
  }
`;
export default Wrapper;
