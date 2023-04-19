import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Logo from './Logo';
import { useAppContext } from '../context/appContext';

const Navbar = () => {
  const { accountHolder } = useAppContext();
  return (
    <nav>
      <div>
        <Logo />
      </div>
      <div className='user'>
        <div className='photo'>
          <img src={accountHolder.photoURL} alt='accountHolder' />
        </div>
        <span>{accountHolder.displayName}</span>
        <button className='btn' onClick={() => signOut(auth)}>
          logout
        </button>
      </div>
    </nav>
  );
};
export default Navbar;
