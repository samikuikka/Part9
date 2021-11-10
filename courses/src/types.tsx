import React from 'react';

interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }

interface CourseDescription extends CoursePartBase {
    description: string
}
  
interface CourseNormalPart extends CourseDescription {
    type: "normal"
}

interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
  
interface CourseSubmissionPart extends CourseDescription {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSpecial extends CourseDescription {
    type: "special",
    requirements: Array<string>
}

export interface CourseProps {
    courseParts: CoursePart[]
}

export interface PartProps {
    course: CoursePart
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecial;