import React from 'react';
import { PartProps } from '../types';

const Part = ({course}: PartProps) => {
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
      };

    switch (course.type) {
        case "normal":
            return (
                <div>
                    <p>
                    <b>{course.name} {course.exerciseCount}</b><br/>
                    <i>{course.description}</i>
                    </p>
                </div>
            );
        case "submission":
            return(
                <div>
                    <p>
                    <b>{course.name} {course.exerciseCount}</b><br/>
                    <i>{course.description}</i><br/>
                    submit to <a href={course.exerciseSubmissionLink}>{course.exerciseSubmissionLink}</a>
                    </p>
                </div>
            );
        case "groupProject":
            return (
                <div>
                    <p>
                        <b>{course.name} {course.exerciseCount}</b><br/>
                        project exercises {course.exerciseCount}
                    </p>
                </div>
            );
        case "special":
            return (
                <div>
                    <p>
                        <b>{course.name} {course.exerciseCount}</b><br/>
                        <i>{course.description}</i><br/>
                        required skills: {course.requirements.join(", ")}
                    </p>
                </div>
            )
        default:
            return assertNever(course)
    }
}

export default Part;