import { useEffect, useState } from 'react';
import Calc from '../calc.js';
import classes from '../styles/Estimator.module.css';

function RpeTable({ mass, reps, rpe }) {
  const [e1rm, setE1rm] = useState(100);
  const [tableData, setTableData] = useState([]);

  function calc1rm(weight, repetitions, exertion) {
    const estimate = Calc.get1rm(weight, repetitions, exertion);

    setE1rm(estimate);
    getTableData(estimate);
  }

  function getTableData(weight) {
    let res = [];
    for (let i = 10; i >= 5; i -= 0.5) {
      const values = [];
      for (let j = 1; j <= 10; j++) {
        const repMax = Calc.get1rm(weight, j, i);
        const eRepMax = (weight * (weight / repMax)).toFixed(0);
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
  for (let i = 1; i <= 10; i++) {
    headers.push(<th key={i}>{i} Rep</th>);
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
            {/* <th>1 Rep</th> */}
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
