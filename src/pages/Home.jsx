import { ChatArea, Sidebar } from '../components';
import Wrapper from '../wrappers/HomePage';

const Home = () => {
  return (
    <Wrapper>
      <div className='container'>
        <Sidebar />
        <ChatArea />
      </div>
    </Wrapper>
  );
};
export default Home;
