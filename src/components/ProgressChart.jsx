import { useEffect, useState } from 'react';
import classes from '../styles/Progress.module.css';
import Calc from '../calc';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { addDays, compareAsc, format, parse } from 'date-fns';

function ProgressChart({ data }) {
  const [maxData, setMaxData] = useState([]);
  const [lastMax, setLastMax] = useState({});
  const [projection, setProjection] = useState([]);

  function deleteLast(e) {
    e.preventDefault();
    // React useState is an object, can't use pop()
    const newData = [];
    let last = {};
    for (let i = 0; i < maxData.length - 1; i++) {
      newData.push(maxData[i]);
      last = maxData[i];
    }

    setMaxData(newData);
    setLastMax(last);
  }

  useEffect(() => {
    if (!data?.formatedDate || !data.mass || !data.reps || !data.rpe) return;

    const max = Calc.get1rm(data.mass, data.reps, data.rpe);

    const last = { day: data.formatedDate, strength: max };
    setLastMax(last);

    setMaxData((prev) =>
      [...prev, last].sort((a, b) =>
        compareAsc(
          parse(a.day, 'MM/dd/yyyy', new Date()),
          parse(b.day, 'MM/dd/yyyy', new Date())
        )
      )
    );
  }, [data]);

  useEffect(() => {
    if (
      !data?.formatedDate ||
      !data.mass ||
      !data.reps ||
      !data.rpe ||
      maxData.length <= 1
    )
      return;

    setProjection(Calc.linearRegression(maxData, lastMax));
  }, [maxData, lastMax]);

  return (
    <div className={classes.mainChart}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart margin={{ bottom: 50, left: 50 }}>
          <Line
            type='monotone'
            dataKey='strength'
            stroke='#002fffff'
            strokeWidth={3}
            dot={false}
            data={projection}
          ></Line>
          <Line
            type='monotone'
            dataKey='strength'
            stroke='#ff0000ff'
            strokeWidth={3}
            dot={false}
            data={maxData}
          ></Line>
          <ReferenceLine y={lastMax.strength} label='Max' stroke='green' />

          <XAxis
            angle={12}
            dataKey='day'
            stroke='#000000ff'
            allowDuplicatedCategory={false}
          >
            <Label className={classes.label} value='days' position='bottom' />
          </XAxis>
          <YAxis domain={['auto', 'auto']} stroke='#000000ff'>
            <Label className={classes.label} value='lbs' position='left' />
          </YAxis>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      <form onSubmit={deleteLast}>
        <button type='submit'>Delete Last Input</button>
      </form>
    </div>
  );
}

export default ProgressChart;
