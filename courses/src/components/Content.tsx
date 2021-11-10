import React from 'react';
import { CourseProps } from '../types';
import Part from './Part'

const Content = ({courseParts}: CourseProps) => {
    return (
        <div>
            {courseParts.map(course => {
                return(
                <div key={course.name}>
                    <Part  course={course} />
                </div>
                )
            })}
        </div>
    )
}

export default Content;
