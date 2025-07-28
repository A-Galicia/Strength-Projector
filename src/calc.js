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
      return sum + parseInt(d.diffInDays);
    }, 0);
    const sumY = mutatedData.reduce((sum, d) => {
      return sum + parseInt(d.strength);
    }, 0);
    const sumXY = mutatedData.reduce((sum, d) => {
      return sum + parseInt(d.diffInDays) * parseInt(d.strength);
    }, 0);
    const sumXsquared = mutatedData.reduce((sum, d) => {
      return sum + parseInt(d.diffInDays) * parseInt(d.diffInDays);
    }, 0);

    let slope = parseFloat(
      (length * sumXY - sumX * sumY) / (length * sumXsquared - sumX * sumX)
    );
    const intercept = (sumY - slope * sumX) / length;

    const lastDay = parse(`${lastMax.day}`, 'MM/dd/yyyy', new Date());

    /* 
    Projecting the days ahead of the last day using the linear regression algorithim
     */

    const projectionDays = [
      addDays(lastDay, 2),
      addDays(lastDay, 5),
      addDays(lastDay, 10),
      addDays(lastDay, 20),
      addDays(lastDay, 30),
      addDays(lastDay, 40),
      addDays(lastDay, 50),
    ];

    const projection = [
      {
        day: format(projectionDays[0], 'MM/dd/yy'),
        strength: (
          slope * differenceInDays(projectionDays[0], lastDay) +
          intercept
        ).toFixed(1),
      },
      {
        day: format(projectionDays[1], 'MM/dd/yy'),
        strength: (
          slope * differenceInDays(projectionDays[1], lastDay) +
          intercept
        ).toFixed(1),
      },
      {
        day: format(projectionDays[2], 'MM/dd/yy'),
        strength: (
          slope * differenceInDays(projectionDays[2], lastDay) +
          intercept
        ).toFixed(1),
      },
      {
        day: format(projectionDays[3], 'MM/dd/yy'),
        strength: (
          slope * differenceInDays(projectionDays[3], lastDay) +
          intercept
        ).toFixed(1),
      },
      {
        day: format(projectionDays[4], 'MM/dd/yy'),
        strength: (
          slope * differenceInDays(projectionDays[4], lastDay) +
          intercept
        ).toFixed(1),
      },
      {
        day: format(projectionDays[5], 'MM/dd/yy'),
        strength: (
          slope * differenceInDays(projectionDays[5], lastDay) +
          intercept
        ).toFixed(1),
      },
      {
        day: format(projectionDays[6], 'MM/dd/yy'),
        strength: (
          slope * differenceInDays(projectionDays[6], lastDay) +
          intercept
        ).toFixed(1),
      },
    ];

    for (let i = 0; i < projection.length; i++) {
      newData.push(projection[i]);
    }

    return newData;
  }
}

export default new Calc();
