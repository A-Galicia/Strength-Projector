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
import { compareAsc, parse } from 'date-fns';

function AuthProgressChart({ data, exercises, name }) {
  const [maxData, setMaxData] = useState([]);
  const [lastMax, setLastMax] = useState({});
  const [projection, setProjection] = useState([]);

  useEffect(() => {
    if (!name || !exercises) {
      return;
    }

    for (let i = 0; i < exercises.length; i++) {
      if (exercises[i].name == name) {
        setMaxData(exercises[i].strength);

        if (exercises[i].strength.length > 0) {
          setLastMax(exercises[i].strength[exercises[i].strength.length - 1]);
        }
      }
    }
  }, [name, exercises]);

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
    if (maxData.length >= 2 && lastMax.strength) {
      setProjection(Calc.linearRegression(maxData, lastMax));
      return;
    }

    if (
      !data?.formatedDate ||
      !data.mass ||
      !data.reps ||
      !data.rpe ||
      maxData.length <= 1
    )
      return;
    else {
      setProjection(Calc.linearRegression(maxData, lastMax));
    }
  }, [maxData, lastMax]);

  async function save() {
    try {
      const token = localStorage.getItem('jwt');
      const body = JSON.stringify({ name: name, strength: maxData });

      const response = await fetch('http://localhost:8080/api/exercises', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`Error, status: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={classes.mainChart}>
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart margin={{ bottom: 50, left: 50 }}>
          <Line
            type='monotone'
            dataKey='strength'
            stroke='#011d95ff'
            strokeWidth={3}
            dot={false}
            data={projection}
            strokeDasharray='8 5'
          ></Line>
          <Line
            type='monotone'
            dataKey='strength'
            stroke='#ff0000ff'
            strokeWidth={3}
            dot={false}
            data={maxData}
          ></Line>
          <ReferenceLine y={lastMax.strength} label='Max' stroke='#14891aff' />

          <XAxis
            dataKey='day'
            stroke='#000000ff'
            allowDuplicatedCategory={false}
          >
            <Label className={classes.label} value='days' position='bottom' />
          </XAxis>
          <YAxis domain={['dataMin - 100', 'dataMax + 100']} stroke='#000000ff'>
            <Label
              className={classes.label}
              value='lbs'
              position='insideTopLeft'
            />
          </YAxis>
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>

      <div>
        <form className={classes.deleteForm} onSubmit={deleteLast}>
          <button className={classes.delete} type='submit'>
            Delete Last Input
          </button>
        </form>

        <form className={classes.deleteForm} onSubmit={save}>
          <button className={classes.delete} type='submit'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthProgressChart;
