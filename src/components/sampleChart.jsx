import classes from '../styles/sample.module.css';

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

const data = (() => {
  let data = [];
  for (let i = 0; i < 30; i++) {
    let x = (3 * i) ** (1 / 3) - i + (0.2 * i) ** 2 + 225;
    const fixedX = x.toFixed(2);
    data.push({ strength: fixedX });
  }
  return data;
})();

function Sample() {
  return (
    <div className={classes.main}>
      <ResponsiveContainer width='100%' height='100%'>
        <AreaChart data={data} margin={{ bottom: 50, left: 30 }}>
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
    </div>
  );
}

export default Sample;
