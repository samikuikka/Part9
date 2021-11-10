import React from 'react';
import { CourseArray } from '../types';

const Total = ({props}: CourseArray) => {

    return(
        <div>
            Number of exercises{" "}
            {props.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </div>
    )
}

export default Total;