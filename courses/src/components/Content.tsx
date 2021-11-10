import React from 'react';
import { CourseArray } from '../types';

const Content = ({props}: CourseArray) => {
    return (
        <div>
            {props.map(course => {
                return(
                    <p key={course.name}>
                        {course.name} {course.exerciseCount}
                    </p>
                )
            })}
        </div>
    )
}

export default Content;
