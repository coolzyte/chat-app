import { Wrapper } from '../wrappers/ChatAreaStyle';
import { BsFillCameraVideoFill, BsPersonFillAdd } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import Messages from './Messages';
import Input from './Input';
const ChatArea = () => {
  return (
    <Wrapper>
      <div className='chatInfo'>
        <span>Angel</span>
        <div className='chatIcons'>
          <BsFillCameraVideoFill />
          <BsPersonFillAdd />
          <FiMoreHorizontal />
        </div>
      </div>
      <Messages />
      <Input />
    </Wrapper>
  );
};
export default ChatArea;
