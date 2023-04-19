import { useState } from 'react';
import {
  collection,
  doc,
  getDoc,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Wrapper } from '../wrappers/SearchStyle';
import FormRow from './FormRow';
import { useAppContext } from '../context/appContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [friend, setFriend] = useState(null);
  const [error, setError] = useState(false);
  const { accountHolder } = useAppContext();

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );
    try {
      const querySnapshot = await getDoc(q);
      querySnapshot.forEach((doc) => {
        setFriend(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  };

  const handleKey = (e) => {
    e.code === 'Enter' && handleSearch();
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exist, if not create
    const combinedId =
      accountHolder.uid > friend.uid
        ? accountHolder.uid + friend.uid
        : friend.uid + accountHolder.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, 'userChats', accountHolder.uid), {
          [combinedId + '.userInfo']: {
            uid: friend.uid,
            displayName: friend.displayName,
            photoURL: friend.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', friend.uid), {
          [combinedId + '.userInfo']: {
            uid: accountHolder.uid,
            displayName: accountHolder.displayName,
            photoURL: accountHolder.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (error) {}
    setFriend(null);
    setUsername('');
  };

  return (
    <Wrapper>
      <div className='searchForm'>
        <FormRow
          placeholder='Find a friend'
          value={username}
          handleKey={handleKey}
          handleChange={handleChange}
        />
      </div>
      {error && <span>User not found!</span>}
      {friend && (
        <div className='userChat' onClick={handleSelect}>
          <img src={friend.photoURL} alt='' />
          <div className='userChatInfo'>
            <span>{friend.displayName}</span>
          </div>
        </div>
      )}
    </Wrapper>
  );
};
export default Search;
