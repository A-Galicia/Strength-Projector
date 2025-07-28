import { useState } from 'react';
import classes from '../styles/Estimator.module.css';
import RpeTable from '../components/RpeTable';
import NavBar from '../components/NavBar';

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
    </div>
  );
}

export default Projector;
