import classes from '../styles/Progress.module.css';

function DeleteExercise({ open, exercises }) {
  async function deleteExercise(id, name) {
    console.log(id);
    const userConfirmation = confirm(
      `Are you sure you want to delete - ${name}`
    );

    if (userConfirmation) {
      try {
        const token = localStorage.getItem('jwt');
        const body = JSON.stringify({ id });

        const response = await fetch('http://localhost:8080/api/exercises', {
          method: 'delete',
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
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div
      className={open ? classes.addExerciseActive : classes.addExerciseInactive}
    >
      {open && (
        <div>
          {exercises.map((exer) => {
            return (
              <p
                className={classes.deleteP}
                onClick={() => deleteExercise(exer.id, exer.name)}
                key={exer.id}
              >
                {exer.name}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default DeleteExercise;
