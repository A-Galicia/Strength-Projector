import { useState } from 'react';
import classes from '../styles/Estimator.module.css';
import RpeTable from '../components/RpeTable';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

function Projector() {
  const [exercise, setExersice] = useState('');
  const [mass, setMass] = useState(100);
  const [reps, setReps] = useState(1);
  const [rpe, setRpe] = useState(10);

  function calculate(e) {
    e.preventDefault();
    console.log(exercise);
    console.log(mass);
    console.log(rpe);
  }

  return (
    <div className={classes.main}>
      <NavBar />

      <form className={classes.form} onSubmit={calculate}>
        <label className={classes.label} htmlFor='exercise'>
          Exercise:
          <input
            className={classes.input}
            id='exercise'
            name='exercise'
            list='exercises'
            value={exercise}
            onChange={(e) => setExersice(e.target.value)}
          />
        </label>

        <datalist id='exercises'>
          <option value='None'></option>
          <option value='Squat'></option>
          <option value='Bench Press'></option>
          <option value='Deadlift'></option>
        </datalist>

        <label className={classes.label} htmlFor='mass'>
          Mass (lbs):
          <input
            className={classes.input}
            id='mass'
            type='number'
            name='mass'
            min='8'
            value={mass}
            onChange={(e) => setMass(e.target.value)}
            required
          />
        </label>
        <label className={classes.label} htmlFor='reps'>
          Repetitions:
          <input
            className={classes.input}
            id='reps'
            type='number'
            min='1'
            max='10'
            name='reps'
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            required
          />
        </label>
        <label className={classes.label} htmlFor='rpe'>
          RPE:
          <input
            className={classes.input}
            id='rpe'
            type='number'
            min='5'
            max='10'
            name='rpe'
            value={rpe}
            onChange={(e) => setRpe(e.target.value)}
            required
          />
        </label>
      </form>

      <RpeTable mass={mass} reps={reps} rpe={rpe} />

      <div className={classes.info}>
        <p>
          This calculation uses the Epley One-Rep-Max formula. Most calculators
          use the 0-index based calculation, skipping 1, starting at 2 for 2
          reps and beyond.
          <br />
          ie. 1-rep max => x = 0
          <br />
          ie. 2-rep max => x = 2
        </p>
        <p>
          This calculator does not skip 1, so resulting rep maxes are slightly
          higher, but I believe this to be more accurate
        </p>
        <p>
          <a href='https://blog.nasm.org/rate-of-perceived-exertion'>RPE</a> is
          the Rating of Percieved Exertion, which is used in this calulation. If
          you went to Failure or don't wish to use RPE, select RPE 10 as it
          won't have an effect on the calculation
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default Projector;
