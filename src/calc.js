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
}

export default new Calc();
