import React, {useState} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import loginClasses from './login.module.scss';
import {useHistory} from 'react-router-dom'
import { openSnackbar } from '../../redux/reducers/commonSlice';
import { setLoggedIn } from '../../redux/reducers/authSlice';

const Login = () => {
  const { theme } = useSelector((state) => state.common);
  const { isLoggedIn } = useSelector((state) => state.auth);

  console.log(theme);
  
  const dispatch = useDispatch();

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    //Check if email is in appropriate format 
    const emailRegex = /\w\.\w+\d*@dreambakery\.com/;
    //Check if password is minimum 8 chars long and if contains upper case letter, number and special char  
    const passwordValidationRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    const emailValid = emailRegex.exec(email) != null;
    const passwordValid = passwordValidationRegex.exec(password) != null;

    if (emailValid && passwordValid ) {
      history.push('/recipes')
      dispatch(setLoggedIn(true));
    } else {
      dispatch(openSnackbar({
        text: 'Incorrect mail or password!',
        type: 'error',
      }));
    }
  }

  return (
    <div className={loginClasses.loginWrapper}>
      <h3>Enter your credentials</h3>
      <form onSubmit={handleFormSubmit}>
        <input className={loginClasses.loginInput}
          type='email' placeholder='Email'
          onChange={e => setEmail(e.target.value)}>
        </input>
        <input className={loginClasses.loginInput}
          type='password' placeholder='Password'
          onChange={e => setPassword(e.target.value)}>
        </input>
        <input className={loginClasses.submitButton} type='submit' value='Login'></input>
      </form>
    </div>
  )
}

export default Login;