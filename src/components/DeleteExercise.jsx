import { useState } from 'react';
import classes from '../styles/Progress.module.css';

function DeleteExercise({ open }) {
  const [exercise, setExercise] = useState('');

  async function postExercise() {
    try {
      const token = localStorage.getItem('jwt');
      const body = JSON.stringify({ exercise });

      const response = await fetch('http://localhost:8080/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className={open ? classes.addExerciseActive : classes.addExerciseInactive}
    >
      {open && (
        <form onSubmit={postExercise}>
          <label className={classes.label} htmlFor='exercise'>
            <input
              className={classes.input}
              id='exercise'
              name='exercise'
              type='text'
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
            />
          </label>
          <button className={classes.submit} type='submit'>
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default DeleteExercise;
