import { useState } from 'react';
import classes from '../styles/Progress.module.css';

const vercelURL = 'https://strength-projector-api.vercel.app';
//const localHostURL = 'http://localhost:8080';

function CreateExercise({ open, onError }) {
  const [exercise, setExercise] = useState('');

  async function postExercise(e) {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwt');
      const body = JSON.stringify({ exercise });

      const response = await fetch(`${vercelURL}/api/exercises`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });
      if (!response.ok) {
        throw new Error(
          `Error status: ${response.status}, try a different name`
        );
      } else {
        window.location.reload();
      }
    } catch (err) {
      onError(err);
      console.log(err);
    }
  }

  return (
    <div
      className={open ? classes.addExerciseActive : classes.addExerciseInactive}
    >
      {open && (
        <form onSubmit={postExercise}>
          <label className={classes.label} htmlFor='addExercise'>
            <input
              className={classes.input}
              id='addExercise'
              name='addExercise'
              type='text'
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            />
          </label>
          <button className={classes.submit} /*  type='submit' */>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default CreateExercise;
