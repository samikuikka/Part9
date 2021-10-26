interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescribtion: string,
    target: number,
    average: number
}

const calculateExercises = (hours: Array<number>, target: number): Result => {
    const periodLength: number = hours.length
    const trainingDays: number = hours.reduce((accumulator, current) => {
        if( current === 0 ) return accumulator
        return accumulator + 1
    }, 0 )
    const average: number = hours.reduce((a, c) => a + c, 0) / periodLength
    const success: boolean = average >= target
    let rating: number
    let ratingDescribtion: string;
    if(success) {
        rating = 3;
        ratingDescribtion = "Nice job"
    } else if(target - average < 1) {
        rating = 2
        ratingDescribtion = "Almost, but could have done better"
    } else {
        rating = 1,
        ratingDescribtion = "Did not go well this time..."
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescribtion: ratingDescribtion,
        target: target,
        average: average
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))