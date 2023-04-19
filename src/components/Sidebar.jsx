import { Wrapper } from '../wrappers/SidebarStyle';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <Wrapper>
      <Navbar />
      <Search />
      <Chats />
    </Wrapper>
  );
};
export default Sidebar;
