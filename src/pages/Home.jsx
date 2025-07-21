import classes from '../styles/home.module.css';

function Home() {
  return (
    <div className={classes.main}>
      <h1>Strength Projector</h1>

      <nav>
        <ul>
          <li>
            <a>Tryout the App</a>
          </li>
          <li>
            <a>Create and account</a>
          </li>
          <li>
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
