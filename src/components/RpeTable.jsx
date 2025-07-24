import { useEffect, useState } from 'react';
import classes from '../styles/Projector.module.css';

function RpeTable({ mass, reps, rpe }) {
  const [e1rm, setE1rm] = useState(100);
  const [tableData, setTableData] = useState([]);

  function calc1rm(weight, repetitions, exertion) {
    const estimate = get1rm(weight, repetitions, exertion);

    setE1rm(estimate);
    getTableData(estimate);
  }

  function get1rm(weight, repetitions, exertion) {
    /*
    Epley 1 rep max formula
    -----------------------
    1RM = weight(1+ (reps/30))
    w/ RPE:  weight(1+ (reps-(10-RPE)/30))


    Epley's formula has a 1 rep max starting at 0
    it skips x = 1, so the original has rep maxes a little lower
    including x = 1 raises the values, to what I believe are the 
    more appropriate values

    this is why total reps is subtracted by 1
    and if reps = 1, then it is 0 for the actual 1 rep max estimate
    */

    let totalReps = parseInt(repetitions) - 1;
    if (repetitions === 1) {
      totalReps = 0;
    }

    const estimate = (
      weight *
      (1 + (totalReps + (10 - exertion)) / 30)
    ).toFixed(1);

    return estimate;
  }

  function getTableData(weight) {
    let res = [];
    for (let i = 10; i >= 5; i -= 0.5) {
      const values = [];
      for (let j = 1; j <= 10; j++) {
        const repMax = get1rm(weight, j, i);
        const eRepMax = (weight * (weight / repMax)).toFixed(1);
        values.push(eRepMax);
      }

      res.push({ rpe: i, maxes: values });
    }

    setTableData(res);
  }

  useEffect(() => {
    calc1rm(mass, reps, rpe);
  }, [mass, reps, rpe]);

  let headers = [];
  for (let i = 2; i <= 10; i++) {
    headers.push(<th key={i}>{i} Reps</th>);
  }

  return (
    <div className={classes.tableDiv}>
      <div className={classes.maxDiv}>
        <p>Estimated 1 Rep Max:</p>
        <span className={classes.max}>{e1rm}</span>
      </div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>1 Rep</th>
            {headers.map((h) => {
              return h;
            })}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => {
            return (
              <tr key={crypto.randomUUID()}>
                <th>RPE {data.rpe}</th>
                {data.maxes.map((max) => {
                  return <td key={crypto.randomUUID()}>{max}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default RpeTable;
