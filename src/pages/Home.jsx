import classes from '../styles/home.module.css';
import Sample from '../components/sampleChart';

function Home() {
  return (
    <div className={classes.main}>
      <h1>Strength Projector</h1>
      <Sample />

      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li className={classes.item}>
            <a className={classes.anchor} href='estimator'>
              Tryout the App
            </a>
          </li>
          <li className={classes.item}>
            <a className={classes.anchor} href='create'>
              Create an Account
            </a>
          </li>
          <li className={classes.item}>
            <a className={classes.anchor} href='login'>
              Login
            </a>
          </li>
          <li className={classes.item}>
            <a
              className={classes.anchor}
              href='https://github.com/A-Galicia/Strength-Projector'
              target='_blank'
              rel='noopener noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Home;
