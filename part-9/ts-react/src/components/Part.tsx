import { CoursePart } from '../App';
import { assertNever } from '../utils/utils';

interface PartProps {
  coursePart: CoursePart;
}

const Part = ({ coursePart }: PartProps) => {
  switch (coursePart.type) {
    case 'normal':
      console.log('coursePart: normal: ', coursePart);
      return (
        <div style={divStyles}>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p style={pStyles}>{coursePart.description}</p>
        </div>
      );
    case 'submission':
      console.log('coursePart: groupProject: ', coursePart);
      return (
        <div style={divStyles}>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p style={pStyles}>{coursePart.description}</p>
          <p style={pStyles}>Submit to: {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
    case 'special':
      console.log('coursePart: groupProject: ', coursePart);
      return (
        <div style={divStyles}>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p style={pStyles}>{coursePart.description}</p>
          <p style={pStyles}>
            Required skills:{' '}
            {coursePart.requirements.map((r, index) =>
              coursePart.requirements.length - 1 > index ? (
                <span>{r}, </span>
              ) : (
                <span>{r}</span>
              )
            )}
          </p>
        </div>
      );

    case 'groupProject':
      console.log('coursePart: groupProject: ', coursePart);
      return (
        <div style={divStyles}>
          <h3>
            {coursePart.name} {coursePart.exerciseCount}
          </h3>
          <p style={pStyles}>
            Project exercises: {coursePart.groupProjectCount}
          </p>
        </div>
      );

    default:
      return assertNever(coursePart);
  }
};

const divStyles = {
  marginBottom: '20px',
};
const pStyles = {
  marginTop: '-12px',
  fontStyle: 'italic',
};

export default Part;
