import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import classes from '../styles/CreateAcct.module.css';

function Home() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errStatus, setErrStatus] = useState(false);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  async function createUser(e) {
    try {
      e.preventDefault();
      const body = JSON.stringify({ username, email, password });

      const response = await fetch('http://localhost:8080/api/user', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors);
        throw new Error(`Error, status: ${response.status}`);
      }
      navigate('/');
    } catch (err) {
      console.log(err);
      setErrStatus(true);
    }
  }

  return (
    <div className={classes.main} onSubmit={createUser}>
      <NavBar />
      <h1>Create Account</h1>

      {errStatus === true ? (
        <ul className={classes.errDiv}>
          {errors.map((err) => {
            return (
              <li key={crypto.randomUUID} className={classes.error}>
                {err.msg}
              </li>
            );
          })}
        </ul>
      ) : null}

      <form className={classes.form}>
        <label className={classes.label} htmlFor='username'>
          Username:
          <input
            className={classes.input}
            id='username'
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete='family-name'
            required
          />
        </label>

        <label className={classes.label} htmlFor='email'>
          Email:
          <input
            className={classes.input}
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        Have an account? <a href='/login'>Login</a>
      </p>
    </div>
  );
}

export default Home;
