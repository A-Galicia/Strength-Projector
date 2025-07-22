import classes from '../styles/Projector.module.css';

function Projector() {
  return (
    <div className={classes.main}>
      <nav>
        <ul className={classes.list}>
          <li className={classes.item}>
            <a>Create Account</a>
          </li>

          <div className={classes.verticalLine}></div>

          <li className={classes.item}>
            <a>Login</a>
          </li>

          <div className={classes.verticalLine}></div>

          <li className={classes.item}>
            <a
              href='https://github.com/A-Galicia/Strength-Projector'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </nav>

      <form className={classes.form}>
        <label className={classes.label} htmlFor='exercise'>
          Exercise:
          <input
            className={classes.input}
            id='exercise'
            name='exercise'
            list='exercises'
          />
        </label>

        <datalist id='exercises'>
          <option value='None'></option>
          <option value='Squat'></option>
          <option value='Bench Press'></option>
          <option value='Deadlift'></option>
        </datalist>

        <label className={classes.label} htmlFor='mass'>
          Mass:
          <input
            className={classes.input}
            id='mass'
            type='number'
            name='mass'
            min='8'
            required
          />
        </label>
        <label className={classes.label} htmlFor='rpe'>
          RPE:
          <input
            className={classes.input}
            id='rpe'
            type='number'
            min='8'
            max='10'
            name='rpe'
            required
          />
        </label>
        <button className={classes.submit} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Projector;
