import { useEffect, useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import classes from '../styles/Progress.module.css';
import NavBar from '../components/NavBar';
import ProgressChart from '../components/ProgressChart';
import CreateExercise from '../components/CreateExercise';
import DeleteExercise from '../components/DeleteExercise';
import Calc from '../calc';
import { format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';

function CheckJwt() {}

function AuthProgress() {
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
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(true);
  const [exercises, setExersices] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  // Check if jwt exists/valid ////////////////////////////////////

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (!token) {
      setAuth(false);
      return;
    }
    const decodedToken = jwtDecode(token);
    let currentDate = new Date();

    if (decodedToken.exp * 1000 < currentDate.getTime()) {
      setAuth(false);
    }
  }, []);

  //_______________________________________________________________

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

  async function fetchExercises() {
    try {
      const token = localStorage.getItem('jwt');

      const response = await fetch('http://localhost:8080/api/exercises', {
        headers: {
          method: 'GET',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }

      const data = await response.json();
      setExersices(data.exercises);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchExercises();
  }, []);

  if (!auth) {
    return (
      <div>
        <p>You're session has expired or You're not Authorized</p>
        <p>
          <a href='/login'>Login again</a>
        </p>
        <p>
          <a href='/'>Return to Home</a>
        </p>
      </div>
    );
  }

  return (
    <div className={classes.main}>
      <NavBar />

      <p>Enter Two data points to create a projection</p>

      <hr className={classes.hr}></hr>

      <form className={classes.form} onSubmit={submitData}>
        <label className={classes.label} htmlFor='exercise'>
          Exercise:
          <select
            name='exercise'
            value={exercise}
            onChange={(e) => setExersice(e.target.value)}
            id='exercise'
          >
            <option value=''>choose an exercise</option>
            {exercises.map((exer) => {
              return (
                <option key={exer.id} value={exer.name}>
                  {exer.name}
                </option>
              );
            })}
          </select>
        </label>

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

      {loading ? (
        <div className={classes.loaderContainer}>
          <div className={classes.loadingText}>
            Loading<span className={classes.dots}></span>
          </div>
        </div>
      ) : (
        <ProgressChart data={data} />
      )}

      <hr className={classes.hr}></hr>

      <div
        onClick={() => {
          setAddOpen(!addOpen);
        }}
      >
        Add Exercises
      </div>
      <CreateExercise open={addOpen} />

      <div
        onClick={() => {
          setDeleteOpen(!deleteOpen);
        }}
      >
        Delete Exercises
      </div>
      <DeleteExercise open={deleteOpen} exercises={exercises} />

      <div className={classes.instrucions}>
        <p>
          The projection works best with a large array of data. So the more
          frequent and the longer the history of data that is charted, the
          projection will even out.
        </p>
        <p>
          This uses a linear regression formulat to calculate the progress in 50
          days
        </p>
        <p>
          <a href='https://blog.nasm.org/rate-of-perceived-exertion'>RPE</a> is
          the Rating of Percieved Exertion, which is used in this calulation. If
          you went to Failure or don't wish to use RPE, select RPE 10 as it
          won't have an effect on the calculation
        </p>
      </div>
    </div>
  );
}

export default AuthProgress;
