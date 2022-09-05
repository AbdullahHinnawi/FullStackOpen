import React from 'react';
import { CoursePart } from '../App';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}
const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((cp: CoursePart) => (
        <Part key={cp.type} coursePart={cp} />
      ))}
    </div>
  );
};

export default Content;
