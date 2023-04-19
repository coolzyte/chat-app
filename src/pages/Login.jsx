import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Alert, FormRow, Logo } from '../components';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import { auth } from '../firebase';

const LoginForm = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { showAlert } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      <Logo />
      <h3>Login</h3>
      {showAlert && <Alert />}
      {error && <span>Something went wrong</span>}
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
      <button type='submit' className='btn btn-block'>
        submit
      </button>
    </form>
  );
};

export default LoginForm;
