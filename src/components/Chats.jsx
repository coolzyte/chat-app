import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { useAppContext } from '../context/appContext';

const Chats = () => {
  const [chats, setChats] = useState([]);
  const { accountHolder } = useAppContext();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(
        doc(db, 'userChats', `${accountHolder.uid}`),
        (doc) => {
          setChats(doc.data());
        }
      );
      return unsub;
    };
    accountHolder.uid && getChats();
  }, [accountHolder.uid]);

  return (
    <div className='chats'>
      {Object.entries(chats)?.map((chat) => (
        <div className='userChat' key={chat[0]}>
          <img src={chat[1].userInfo.photoURL} alt='' />
          <div className='userChatInfo'>
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Chats;
