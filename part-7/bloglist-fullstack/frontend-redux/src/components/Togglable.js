import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  console.log(props.children);

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} size="sm">
          {props.buttonLabel}
        </Button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          size="sm"
          variant="secondary"
          className="mt-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
