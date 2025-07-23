import { useEffect, useState } from 'react';

function RpeTable({ mass, reps, rpe }) {
  const [e1rm, setE1rm] = useState(100);
  const [tableData, setTableData] = useState([]);

  function calc1rm(weight, repetitions, exertion) {
    /*
    Epley 1 rep max formula
    -----------------------
    1RM = weight(1+ (reps/30))
    w/ RPE:  weight(1+ (reps-(10-RPE)/30))
    */
    let totalReps = parseInt(repetitions);
    if (repetitions == 1) {
      totalReps = 0;
    }

    const estimate = (
      weight *
      (1 + (totalReps + (10 - exertion)) / 30)
    ).toFixed(1);

    setE1rm(estimate);
    getTableData(estimate);
  }

  function get1rm(weight, repetitions, exertion) {
    /*
    Epley 1 rep max formula
    -----------------------
    1RM = weight(1+ (reps/30))
    w/ RPE:  weight(1+ (reps-(10-RPE)/30))
    */
    let totalReps = repetitions - 1;
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
    <div>
      <p>
        <b>Estimated 1 Rep Max: {e1rm}</b>
      </p>
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
