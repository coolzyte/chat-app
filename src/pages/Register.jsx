import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../firebase';
import { Alert, FormRow } from '../components';
import { BsImage } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    file: '',
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    setValues((prevState) => ({ ...prevState, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, file } = values;

    if (!file) {
      setError(true);
      return;
    }

    try {
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
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h3>Register</h3>
      {error && <Alert />}
      <FormRow
        type='text'
        name='name'
        value={values.name}
        handleChange={handleChange}
        label='Name'
      />
      <FormRow
        type='email'
        name='email'
        value={values.email}
        handleChange={handleChange}
        label='Email'
      />
      <FormRow
        type='password'
        name='password'
        value={values.password}
        handleChange={handleChange}
        label='Password'
      />
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
      <button type='submit' className='btn btn-block'>
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
