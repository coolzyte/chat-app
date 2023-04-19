import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Wrapper from '../wrappers/RegisterPage';
import { Alert, FormRow, Logo } from '../components';
import { BsImage } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

const Register = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    file: '',
    isMember: true,
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAppContext();

  const toggleMember = () => {
    setValues((prevState) => ({ ...prevState, isMember: !prevState.isMember }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setValues((prevState) => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, file, isMember } = values;

    if (!file && !isMember) {
      setError(true);
      return;
    }

    try {
      if (isMember) {
        // Log in existing user
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else {
        // Register new user
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          'state_changed',
          null,
          () => setError(true),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateProfile(user, {
              displayName: name,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', user.uid), {
              uid: user.uid,
              displayName: name,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'userChats', user.uid), {});
            navigate('/');
          }
        );
      }
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={handleSubmit}>
        <Logo />
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {error && <span>Something went wrong</span>}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        {!values.isMember && (
          <div className='uploadAvatar'>
            <input
              required
              style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
              type='file'
              id='file'
              onChange={handleFileChange}
            />
            <label htmlFor='file'>
              <BsImage />
              <span>Add an avatar</span>
            </label>
          </div>
        )}
        <button type='submit' className='btn btn-block'>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet? ' : 'Already a member? '}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
