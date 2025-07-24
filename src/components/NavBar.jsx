import classes from '../styles/NavBar.module.css';

function NavBar() {
  return (
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

        <div className={classes.verticalLine}></div>

        <li className={classes.item}>
          <a href='/progress'>Progress Projector</a>
        </li>

        <div className={classes.verticalLine}></div>

        <li className={classes.item}>
          <a href='/estimator'>Max Estimator</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
