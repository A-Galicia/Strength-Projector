import classes from '../styles/home.module.css';
import Sample from '../components/sampleChart';

function Home() {
  return (
    <div className={classes.main}>
      <h1>Strength Projector</h1>
      <Sample></Sample>
      <nav>
        <ul className={classes.list}>
          <li className={classes.item}>
            <a href='estimator'>Tryout the App</a>
          </li>
          <li className={classes.item}>
            <a>Create an account</a>
          </li>
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
    </div>
  );
}

export default Home;
