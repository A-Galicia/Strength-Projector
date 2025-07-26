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
    if (!data?.formatedDate || !data.mass || !data.reps || !data.rpe) return;

    let realData = maxData;

    const newData = realData.map((max, index) => {
      return index !== realData.length - 1 ? { ...max, strength: null } : max;
    });

    const lastDay = parse(`${lastMax.day}`, 'MM/dd/yyyy', new Date());

    const proj = [
      { day: format(addDays(lastDay, 1), 'MM/dd/yyyy'), strength: 200 },
      { day: format(addDays(lastDay, 2), 'MM/dd/yyyy'), strength: 250 },
      { day: format(addDays(lastDay, 3), 'MM/dd/yyyy'), strength: 275 },
      { day: format(addDays(lastDay, 4), 'MM/dd/yyyy'), strength: 290 },
      { day: format(addDays(lastDay, 5), 'MM/dd/yyyy'), strength: 300 },
    ];

    for (let i = 0; i < proj.length - 1; i++) {
      newData.push(proj[i]);
    }

    setProjection(newData);
  }, [maxData]);

  useEffect(() => {
    console.log(projection);
  }, [projection]);

  return (
    <div className={classes.mainChart}>
      {/* <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={maxData} margin={{ bottom: 50, left: 50 }}>
          <Line
            type='monotone'
            dataKey='strength'
            stroke='#ff0000ff'
            strokeWidth={3}
            dot={false}
          ></Line>
          <ReferenceLine y={lastMax.strength} label='Max' stroke='green' />
          <ReferenceLine x={lastMax.day} label='Max' stroke='green' />
          <XAxis angle={12} dataKey='day' stroke='#000000ff'>
            <Label className={classes.label} value='days' position='bottom' />
          </XAxis>
          <YAxis domain={['auto', 'auto']} stroke='#000000ff'>
            <Label className={classes.label} value='lbs' position='left' />
          </YAxis>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer> */}

      <ResponsiveContainer width='100%' height='100%'>
        <LineChart margin={{ bottom: 50, left: 50 }}>
          {/* <Line
            dataKey='projected'
            stroke='#002fffff'
            strokeWidth={3}
            dot={false}
            data={maxData}
          ></Line> */}
          <Line
            type='monotone'
            dataKey='strength'
            stroke='#ff0000ff'
            strokeWidth={3}
            dot={false}
            data={maxData}
          ></Line>
          <ReferenceLine y={lastMax.strength} label='Max' stroke='green' />
          <ReferenceLine x={lastMax.day} label='Max' stroke='green' />
          <XAxis angle={12} dataKey='day' stroke='#000000ff'>
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
