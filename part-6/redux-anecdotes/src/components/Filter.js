import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.setFilter(event.target.value);
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};

// Since the component does not need to access the store's state, we
// can simply pass null as the first parameter to connect.
const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
