import { addDays, format, parse, differenceInDays } from 'date-fns';

class Calc {
  get1rm(weight, repetitions, exertion) {
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
  parseDate(dateString) {
    let [year, month, day] = dateString.split('-').map(Number);
    month = month - 1;
    return { year, month, day };
  }

  linearRegression(data, lastMax) {
    /* let realData = data;

    const newData = realData.map((max, index) => {
      return index !== realData.length - 1 ? { ...max, strength: null } : max;
    });

    const lastDay = parse(`${lastMax.day}`, 'MM/dd/yyyy', new Date());

    const proj = [
      { day: format(addDays(lastDay, 1), 'MM/dd/yy'), strength: '200' },
      { day: format(addDays(lastDay, 2), 'MM/dd/yy'), strength: '250' },
      { day: format(addDays(lastDay, 3), 'MM/dd/yy'), strength: '275' },
      { day: format(addDays(lastDay, 4), 'MM/dd/yy'), strength: '290' },
      { day: format(addDays(lastDay, 5), 'MM/dd/yy'), strength: '300' },
    ];

    for (let i = 0; i < proj.length - 1; i++) {
      newData.push(proj[i]);
    }

    return newData; */

    let realData = data;

    const newData = realData.map((max, index) => {
      return index !== realData.length - 1 ? { ...max, strength: null } : max;
    });

    const firstDay = parse(`${realData[0].day}`, 'MM/dd/yyyy', new Date());
    const mutatedData = realData.map((max) => {
      const workoutDay = parse(`${max.day}`, 'MM/dd/yyyy', new Date());
      return { ...max, diffInDays: differenceInDays(workoutDay, firstDay) };
    });

    /* 

    Applying Linear Regression

     */

    const length = mutatedData.length;
    const sumX = mutatedData.reduce((sum, d) => {
      return sum + d.diffInDays;
    }, 0);
    const sumY = mutatedData.reduce((sum, d) => {
      return sum + d.diffInDays;
    }, 0);
    const sumXY = mutatedData.reduce((sum, d) => {
      return sum + d.diffInDays * d.strength;
    }, 0);
    const sumXsquared = mutatedData.reduce((sum, d) => {
      return sum + d.diffInDays * d.diffInDays;
    }, 0);

    console.log(sumX);
    console.log(sumY);
    console.log(sumXY);
    console.log(sumXsquared);

    const slope =
      (length * sumXY - sumY * sumXY) / (length * sumXsquared - sumXsquared);
    const intercept = (sumY - slope * sumX) / length;

    const lastDay = parse(`${lastMax.day}`, 'MM/dd/yyyy', new Date());

    const projectionDays = [
      addDays(lastDay, 1),
      addDays(lastDay, 7),
      addDays(lastDay, 14),
      addDays(lastDay, 21),
      addDays(lastDay, 28),
    ];

    const projection = [
      {
        day: format(projectionDays[0], 'MM/dd/yy'),
        strength:
          slope + differenceInDays(projectionDays[0], lastDay) + intercept,
      },
      {
        day: format(projectionDays[1], 'MM/dd/yy'),
        strength:
          slope + differenceInDays(projectionDays[1], lastDay) + intercept,
      },
      {
        day: format(projectionDays[2], 'MM/dd/yy'),
        strength:
          slope + differenceInDays(projectionDays[2], lastDay) + intercept,
      },
      {
        day: format(projectionDays[3], 'MM/dd/yy'),
        strength:
          slope + differenceInDays(projectionDays[3], lastDay) + intercept,
      },
      {
        day: format(projectionDays[4], 'MM/dd/yy'),
        strength:
          slope + differenceInDays(projectionDays[4], lastDay) + intercept,
      },
    ];
    console.log(projection);

    for (let i = 0; i < projection.length - 1; i++) {
      newData.push(projection[i]);
    }

    return newData;
  }
}

export default new Calc();
