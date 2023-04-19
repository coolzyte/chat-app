import { Wrapper } from '../wrappers/InputStyle';
import { MdAttachFile } from 'react-icons/md';
import { RiImageAddLine } from 'react-icons/ri';
const Input = () => {
  return (
    <Wrapper>
      <input />
      <div className='inputItems'>
        <input type='file' style={{ display: 'none' }} id='file' />
        <MdAttachFile />
        <label htmlFor='file'>
          <RiImageAddLine />
        </label>

        <button className='btn'>Send</button>
      </div>
    </Wrapper>
  );
};
export default Input;
