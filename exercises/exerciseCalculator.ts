interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescribtion: string,
    target: number,
    average: number
}

interface exerciseValues {
    target: number,
    array: Array<number>
}

const parseArgumentList = (args: Array<string>) : exerciseValues => {
    if( args.length < 4 ) throw new Error('Not enough arguments');

    args.forEach( ( a, i) => {
        if(i > 1 && isNaN(Number(a))) {
            throw new Error('Provided values were not number');
        }
    });

    return {
        target: Number(args[2]),
        array: args.filter((n, i) => i >= 3).map( n => Number(n))
    };
};

const calculateExercises = (hours: Array<number>, target: number): Result => {
    const periodLength: number = hours.length;
    const trainingDays: number = hours.reduce((accumulator, current) => {
        if( current === 0 ) return accumulator;
        return accumulator + 1;
    }, 0 );
    const average: number = hours.reduce((a, c) => a + c, 0) / periodLength;
    const success: boolean = average >= target;
    let rating: number;
    let ratingDescribtion: string;
    if(success) {
        rating = 3;
        ratingDescribtion = "Nice job";
    } else if(target - average < 1) {
        rating = 2;
        ratingDescribtion = "Almost, but could have done better";
    } else {
        rating = 1,
        ratingDescribtion = "Did not go well this time...";
    }

    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: success,
        rating: rating,
        ratingDescribtion: ratingDescribtion,
        target: target,
        average: average
    };
};

try {
    const {target, array} = parseArgumentList(process.argv);
    console.log(calculateExercises(array, target));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if(error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
