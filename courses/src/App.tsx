import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';
import { Course } from './types';

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ] as Course[];

  return (
    <div>
      <Header name={courseName} />
      <Content props={courseParts} />
      <Total props={courseParts} />
    </div>
  );
};

export default App;
