import Content from './components/Content';
import Header from './components/Header';
import Total from './components/Total';

// new types
export interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

export interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

export interface CourseNormalPart extends CoursePartWithDescription {
  type: 'normal';
}

/*
OR
export interface CourseNormalPart extends CoursePartBase, CoursePartWithDescription {
  type: 'normal';
}
*/

export interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

export interface CourseSubmissionPart extends CoursePartWithDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

export interface CourseSpecialPart extends CoursePartWithDescription {
  type: 'special';
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const App = () => {
  const courseName = 'Half Stack application development';

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the harded course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  const getSumOfExercises = (): number => {
    return courseParts.reduce((carry, part) => carry + part.exerciseCount, 0);
  };

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total sum={getSumOfExercises()} />
    </div>
  );
};

export default App;
