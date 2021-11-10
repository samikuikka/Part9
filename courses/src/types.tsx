import React from 'react';

export interface CourseArray {
  props: Course[]
}

export interface Course {
    name: string,
    exerciseCount: number
}