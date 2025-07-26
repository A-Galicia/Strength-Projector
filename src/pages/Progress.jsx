import { useState } from 'react';
import classes from '../styles/Progress.module.css';
import NavBar from '../components/NavBar';
import ProgressChart from '../components/ProgressChart';
import Calc from '../calc';
import { format } from 'date-fns';

function Progress() {
  const [exercise, setExersice] = useState('');
  const [mass, setMass] = useState(100);
  const [reps, setReps] = useState(1);
  const [rpe, setRpe] = useState(10);
  const [date, setDate] = useState('');
  const [data, setData] = useState({
    exercise: '',
    mass: 100,
    reps: 1,
    rep: 10,
    date: format(new Date(`2025`, `01`, `01`), 'MM/dd/yy'),
  });

  function submitData(e) {
    e.preventDefault();
    const { year, month, day } = Calc.parseDate(date);
    const formatedDate = format(
      new Date(`${year}`, `${month}`, `${day}`),
      'MM/dd/yy'
    );

    const data = {
      exercise,
      mass,
      reps,
      rpe,
      formatedDate,
    };
    setData(data);
  }

  return (
    <div className={classes.main}>
      <NavBar />

      <p>Enter Two data points to create a projection</p>
      <form className={classes.form} onSubmit={submitData}>
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

        <label htmlFor='date'>
          Date:
          <input
            id='date'
            type='date'
            name='date'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button className={classes.submit} type='submit'>
          Submit
        </button>
      </form>

      <ProgressChart data={data} />
    </div>
  );
}

export default Progress;
