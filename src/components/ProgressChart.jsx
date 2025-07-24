import { useEffect, useState } from 'react';
import classes from '../styles/Progress.module.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Label,
  ResponsiveContainer,
  AreaChart,
} from 'recharts';

function ProgressChart({ data }) {
  const [maxData, setMaxData] = useState([]);

  function deleteLast(e) {
    e.preventDefault();
    // React useState is an object, can't use pop()
    const newData = [];
    for (let i = 0; i < maxData.length - 1; i++) {
      newData.push(maxData[i]);
    }

    setMaxData(newData);
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

  useEffect(() => {
    const max = get1rm(data.mass, data.reps, data.rpe);

    setMaxData([...maxData, { strength: max }]);
  }, [data]);

  return (
    <div className={classes.mainChart}>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={maxData} margin={{ bottom: 50, left: 50 }}>
          <Line
            type='monotone'
            dataKey='strength'
            stroke='#ff0000ff'
            strokeWidth={3}
            dot={false}
          ></Line>
          <XAxis stroke='#000000ff'>
            <Label className={classes.label} value='days' position='bottom' />
          </XAxis>
          <YAxis domain={['auto', 'auto']} stroke='#000000ff'>
            <Label className={classes.label} value='lbs' position='left' />
          </YAxis>
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>

      <form onSubmit={deleteLast}>
        <button type='submit'>Delete Last Input</button>
      </form>
    </div>
  );
}

export default ProgressChart;
