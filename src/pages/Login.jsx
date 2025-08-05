import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import classes from '../styles/CreateAcct.module.css';

const vercelURL = 'https://strength-projector-api.vercel.app';
//const localHostURL = 'http://localhost:8080';

function Login() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errStatus, setErrStatus] = useState(false);
  const [errors, setErrors] = useState('');
  const navigate = useNavigate();

  async function createUser(e) {
    try {
      e.preventDefault();
      const body = JSON.stringify({ usernameOrEmail, password });

      const response = await fetch(`${vercelURL}/api/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.message);
        throw new Error(`Error, status: ${response.status}`);
      }

      localStorage.setItem('jwt', data.accessToken);
      navigate('/auth/progress');
    } catch (err) {
      console.log(err);
      setErrStatus(true);
    }
  }

  return (
    <div className={classes.main} onSubmit={createUser}>
      <NavBar />
      <h1>Login</h1>

      {errStatus === true ? (
        <ul className={classes.errDiv}>
          {
            <li key={crypto.randomUUID} className={classes.error}>
              {errors}
            </li>
          }
        </ul>
      ) : null}

      <form className={classes.form}>
        <label className={classes.label} htmlFor='usernameOrEmail'>
          Username:
          <input
            className={classes.input}
            id='usernameOrEmail'
            type='text'
            name='usernameOrEmail'
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            autoComplete='email'
            required
          />
        </label>

        <label className={classes.label} htmlFor='password'>
          Password:
          <input
            className={classes.input}
            id='password'
            type='password'
            min='5'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete='new-password'
            required
          />
        </label>

        <button className={classes.submit} type='submit'>
          Submit
        </button>
      </form>

      <p>
        Need an account? <a href='/create'>Create one HERE!</a>
      </p>
    </div>
  );
}

export default Login;
