import classes from '../styles/Footer.module.css';

function Footer() {
  return (
    <footer className={classes.foot}>
      <p>
        <a
          className={classes.anchor}
          href='https://github.com/A-Galicia/Strength-Projector'
          target='_blank'
          rel='noopener noreferrer'
        >
          Check out my Github
        </a>
      </p>
    </footer>
  );
}

export default Footer;
