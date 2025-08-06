import classes from '../styles/NavBar.module.css';

function NavBar() {
  return (
    <nav>
      <ul className={classes.list}>
        <li className={classes.item}>
          <a className={classes.anchor} href='/create'>
            Create Account
          </a>
        </li>

        <div className={classes.verticalLine}></div>

        <li className={classes.item}>
          <a className={classes.anchor} href='/login'>
            Login
          </a>
        </li>

        <div className={classes.verticalLine}></div>

        <li className={classes.item}>
          <a className={classes.anchor} href='/progress'>
            Progress Projector
          </a>
        </li>

        <div className={classes.verticalLine}></div>

        <li className={classes.item}>
          <a className={classes.anchor} href='/estimator'>
            Max Estimator
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
